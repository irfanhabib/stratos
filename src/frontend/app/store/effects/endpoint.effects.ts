import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';

import {
  CONNECT_ENDPOINTS,
  CONNECT_ENDPOINTS_FAILED,
  CONNECT_ENDPOINTS_SUCCESS,
  ConnectEndpoint,
  DISCONNECT_ENDPOINTS,
  DISCONNECT_ENDPOINTS_FAILED,
  DISCONNECT_ENDPOINTS_SUCCESS,
  DisconnectEndpoint,
  GetAllEndpoints,
  GetAllEndpointsSuccess,
  REGISTER_ENDPOINTS,
  REGISTER_ENDPOINTS_FAILED,
  REGISTER_ENDPOINTS_SUCCESS,
  RegisterEndpoint,
  UNREGISTER_ENDPOINTS,
  UNREGISTER_ENDPOINTS_FAILED,
  UNREGISTER_ENDPOINTS_SUCCESS,
  UnregisterEndpoint,
} from '../actions/endpoint.actions';
import { ClearPages, ClearPaginationOfEntity } from '../actions/pagination.actions';
import { GET_SYSTEM_INFO_SUCCESS, GetSystemSuccess } from '../actions/system.actions';
import { AppState } from '../app-state';
import { ApiRequestTypes } from '../reducers/api-request-reducer/request-helpers';
import { NormalizedResponse } from '../types/api.types';
import { endpointStoreNames, EndpointType, StateUpdateAction } from '../types/endpoint.types';
import {
  IRequestAction,
  StartRequestAction,
  WrapperRequestActionFailed,
  WrapperRequestActionSuccess,
} from '../types/request.types';

@Injectable()
export class EndpointsEffect {

  static connectingKey = 'connecting';
  static disconnectingKey = 'disconnecting';
  static registeringKey = 'registering';

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>
  ) { }

  @Effect() getAllEndpoints$ = this.actions$.ofType<GetSystemSuccess>(GET_SYSTEM_INFO_SUCCESS)
    .pipe(mergeMap(action => {
      const endpointsActions = new GetAllEndpoints(action.login);
      const actionType = 'fetch';
      this.store.dispatch(new StartRequestAction(endpointsActions, actionType));

      const endpoints = action.payload.endpoints;

      // Data is an array of endpoints
      const mappedData = {
        entities: {
          [endpointStoreNames.type]: {}
        },
        result: []
      } as NormalizedResponse;

      Object.keys(endpoints).forEach((type: string) => {
        const endpointsForType = endpoints[type];
        Object.values(endpointsForType).forEach(endpointInfo => {
        mappedData.entities[endpointStoreNames.type][endpointInfo.guid] = {
          ...endpointInfo,
          connectionStatus: endpointInfo.user ? 'connected' : 'disconnected',
          registered: !!endpointInfo.user,
        };
        mappedData.result.push(endpointInfo.guid);
      });
      });

      // Order is important. Need to ensure data is written (none cf action success) before we notify everything is loaded
      // (endpoint success)
      return [
        new WrapperRequestActionSuccess(mappedData, endpointsActions, actionType),
        new GetAllEndpointsSuccess(mappedData, endpointsActions.login),
      ];
    }));

  @Effect() connectEndpoint$ = this.actions$.ofType<ConnectEndpoint>(CONNECT_ENDPOINTS)
    .flatMap(action => {
      const actionType = 'update';
      const apiAction = this.getEndpointUpdateAction(action.guid, action.type, EndpointsEffect.connectingKey);
      const params: HttpParams = new HttpParams({
        fromObject: {
          ...<any>action.authValues,
          'cnsi_guid': action.guid,
          'connect_type': action.authType,
        }
      });

      return this.doEndpointAction(
        apiAction,
        '/pp/v1/auth/login/cnsi',
        params,
        null,
        [CONNECT_ENDPOINTS_SUCCESS, CONNECT_ENDPOINTS_FAILED],
        action.body,
      );
    });

  @Effect() disconnect$ = this.actions$.ofType<DisconnectEndpoint>(DISCONNECT_ENDPOINTS)
    .flatMap(action => {

      const apiAction = this.getEndpointUpdateAction(action.guid, action.type, EndpointsEffect.disconnectingKey);
      const params: HttpParams = new HttpParams({
        fromObject: {
          'cnsi_guid': action.guid
        }
      });

      return this.doEndpointAction(
        apiAction,
        '/pp/v1/auth/logout/cnsi',
        params,
        null,
        [DISCONNECT_ENDPOINTS_SUCCESS, DISCONNECT_ENDPOINTS_FAILED]
      );
    });

  @Effect({ dispatch: false }) connectSuccess$ = this.actions$.ofType<StateUpdateAction>(CONNECT_ENDPOINTS_SUCCESS)
    .pipe(
      map(action => {
        if (action.endpointType === 'cloud-foundry') {
          this.store.dispatch(new ClearPages('application', 'applicationWall'));
        }
      })
    );


  @Effect() unregister$ = this.actions$.ofType<UnregisterEndpoint>(UNREGISTER_ENDPOINTS)
    .flatMap(action => {

      const apiAction = this.getEndpointDeleteAction(action.guid, action.type);
      const params: HttpParams = new HttpParams({
        fromObject: {
          'cnsi_guid': action.guid
        }
      });

      return this.doEndpointAction(
        apiAction,
        '/pp/v1/unregister',
        params,
        'delete',
        [UNREGISTER_ENDPOINTS_SUCCESS, UNREGISTER_ENDPOINTS_FAILED]
      );
    });

  @Effect() register$ = this.actions$.ofType<RegisterEndpoint>(REGISTER_ENDPOINTS)
    .flatMap(action => {

      const apiAction = this.getEndpointUpdateAction(action.guid(), action.type, EndpointsEffect.registeringKey);
      const params: HttpParams = new HttpParams({
        fromObject: {
          'cnsi_name': action.name,
          'api_endpoint': action.endpoint,
          'skip_ssl_validation': action.skipSslValidation ? 'true' : 'false',
        }
      });

      return this.doEndpointAction(
        apiAction,
        '/pp/v1/register/' + action.endpointType,
        params,
        'create',
        [REGISTER_ENDPOINTS_SUCCESS, REGISTER_ENDPOINTS_FAILED]
      );
    });


  private getEndpointUpdateAction(guid, type, updatingKey) {
    return {
      entityKey: endpointStoreNames.type,
      guid,
      type,
      updatingKey,
    } as IRequestAction;
  }

  private getEndpointDeleteAction(guid, type) {
    return {
      entityKey: endpointStoreNames.type,
      guid,
      type,
    } as IRequestAction;
  }

  private doEndpointAction(
    apiAction: IRequestAction,
    url: string,
    params: HttpParams,
    apiActionType: ApiRequestTypes = 'update',
    actionStrings: [string, string] = [null, null],
    endpointType: EndpointType = 'cloud-foundry'
    body?: string,
  ) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    this.store.dispatch(new StartRequestAction(apiAction, apiActionType));
    return this.http.post(url, body || {}, {
      headers,
      params
    }).map(endpoint => {
      if (actionStrings[0]) {
        this.store.dispatch({ type: actionStrings[0], guid: apiAction.guid, endpointType: endpointType });
      }
      if (apiActionType === 'delete') {
        this.store.dispatch(new ClearPaginationOfEntity(apiAction.entityKey, apiAction.guid));
      }
      return new WrapperRequestActionSuccess(null, apiAction, apiActionType);
    })
      .catch(e => {
        if (actionStrings[1]) {
          this.store.dispatch({ type: actionStrings[1], guid: apiAction.guid });
        }
        return [new WrapperRequestActionFailed('Could not connect', apiAction, apiActionType)];
      });
  }
}
