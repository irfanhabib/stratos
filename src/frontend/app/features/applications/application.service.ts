import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { combineLatest, filter, first, map, publishReplay, refCount, startWith, switchMap } from 'rxjs/operators';

import { IApp, IOrganization, ISpace } from '../../core/cf-api.types';
import { EntityService } from '../../core/entity-service';
import { EntityServiceFactory } from '../../core/entity-service-factory.service';
import {
  ApplicationStateData,
  ApplicationStateService,
} from '../../shared/components/application-state/application-state.service';
import { APP_GUID, CF_GUID } from '../../shared/entity.tokens';
import { PaginationMonitor } from '../../shared/monitors/pagination-monitor';
import { PaginationMonitorFactory } from '../../shared/monitors/pagination-monitor.factory';
import { AppMetadataTypes, GetAppStatsAction, GetAppSummaryAction } from '../../store/actions/app-metadata.actions';
import { GetApplication, UpdateApplication, UpdateExistingApplication } from '../../store/actions/application.actions';
import { GetSpace } from '../../store/actions/space.actions';
import { AppState } from '../../store/app-state';
import {
  applicationSchemaKey,
  appStatsSchemaKey,
  appSummarySchemaKey,
  domainSchemaKey,
  entityFactory,
  organizationSchemaKey,
  routeSchemaKey,
  serviceBindingSchemaKey,
  spaceSchemaKey,
  spaceWithOrgKey,
  stackSchemaKey,
} from '../../store/helpers/entity-factory';
import { createEntityRelationKey } from '../../store/helpers/entity-relations/entity-relations.types';
import { ActionState, rootUpdatingKey } from '../../store/reducers/api-request-reducer/types';
import { selectEntity, selectUpdateInfo } from '../../store/selectors/api.selectors';
import { endpointEntitiesSelector } from '../../store/selectors/endpoint.selectors';
import { APIResource, EntityInfo } from '../../store/types/api.types';
import { AppStat, AppSummary } from '../../store/types/app-metadata.types';
import { PaginationEntityState } from '../../store/types/pagination.types';
import {
  getCurrentPageRequestInfo,
  getPaginationObservables,
  PaginationObservables,
} from './../../store/reducers/pagination-reducer/pagination-reducer.helper';
import {
  ApplicationEnvVarsHelper,
  EnvVarStratosProject,
} from './application/application-tabs-base/tabs/build-tab/application-env-vars.service';
import { getRoute, isTCPRoute } from './routes/routes.helper';


export function createGetApplicationAction(guid: string, endpointGuid: string) {
  return new GetApplication(
    guid,
    endpointGuid, [
      createEntityRelationKey(applicationSchemaKey, routeSchemaKey),
      createEntityRelationKey(applicationSchemaKey, spaceSchemaKey),
      createEntityRelationKey(applicationSchemaKey, stackSchemaKey),
      createEntityRelationKey(applicationSchemaKey, serviceBindingSchemaKey),
      createEntityRelationKey(routeSchemaKey, domainSchemaKey),
      createEntityRelationKey(spaceSchemaKey, organizationSchemaKey),
    ]
  );
}

export interface ApplicationData {
  fetching: boolean;
  app: EntityInfo;
  stack: EntityInfo;
  cf: any;
}

@Injectable()
export class ApplicationService {

  private appEntityService: EntityService;
  private appSummaryEntityService: EntityService;

  constructor(
    @Inject(CF_GUID) public cfGuid,
    @Inject(APP_GUID) public appGuid,
    private store: Store<AppState>,
    private entityServiceFactory: EntityServiceFactory,
    private appStateService: ApplicationStateService,
    private appEnvVarsService: ApplicationEnvVarsHelper,
    private paginationMonitorFactory: PaginationMonitorFactory
  ) {

    this.appEntityService = this.entityServiceFactory.create<APIResource<IApp>>(
      applicationSchemaKey,
      entityFactory(applicationSchemaKey),
      appGuid,
      createGetApplicationAction(appGuid, cfGuid)
    );

    this.appSummaryEntityService = this.entityServiceFactory.create(
      appSummarySchemaKey,
      entityFactory(appSummarySchemaKey),
      appGuid,
      new GetAppSummaryAction(appGuid, cfGuid),
      false
    );

    this.constructCoreObservables();
    this.constructAmalgamatedObservables();
    this.constructStatusObservables();
  }

  // NJ: This needs to be cleaned up. So much going on!
  /**
   * An observable based on the core application entity
   */
  isFetchingApp$: Observable<boolean>;
  isUpdatingApp$: Observable<boolean>;

  isDeletingApp$: Observable<boolean>;

  isFetchingEnvVars$: Observable<boolean>;
  isUpdatingEnvVars$: Observable<boolean>;
  isFetchingStats$: Observable<boolean>;

  app$: Observable<EntityInfo<APIResource<IApp>>>;
  waitForAppEntity$: Observable<EntityInfo<APIResource<IApp>>>;
  appSummary$: Observable<EntityInfo<AppSummary>>;
  appStats$: Observable<APIResource<AppStat>[]>;
  private appStatsFetching$: Observable<PaginationEntityState>; // Use isFetchingStats$ which is properly gated
  appEnvVars: PaginationObservables<APIResource>;
  appOrg$: Observable<APIResource<IOrganization>>;
  appSpace$: Observable<APIResource<ISpace>>;

  application$: Observable<ApplicationData>;
  applicationStratProject$: Observable<EnvVarStratosProject>;
  applicationState$: Observable<ApplicationStateData>;
  applicationUrl$: Observable<string>;
  applicationRunning$: Observable<boolean>;

  /**
   * Fetch the current state of the app (given it's instances) as an object ready
   *
   * @static
   * @param {Store<AppState>} store
   * @param {ApplicationStateService} appStateService
   * @param {any} app
   * @param {string} appGuid
   * @param {string} cfGuid
   * @returns {Observable<ApplicationStateData>}
   * @memberof ApplicationService
   */
  static getApplicationState(
    store: Store<AppState>,
    appStateService: ApplicationStateService,
    app: IApp,
    appGuid: string,
    cfGuid: string): Observable<ApplicationStateData> {
    const dummyAction = new GetAppStatsAction(appGuid, cfGuid);
    const paginationMonitor = new PaginationMonitor(
      store,
      dummyAction.paginationKey,
      entityFactory(appStatsSchemaKey)
    );
    return paginationMonitor.currentPage$.pipe(
      map(appInstancesPages => {
        const appInstances = [].concat.apply([], Object.values(appInstancesPages))
          .filter(apiResource => !!apiResource)
          .map(apiResource => {
            return apiResource.entity;
          });
        return appStateService.get(app, appInstances);
      })
    ).pipe(publishReplay(1), refCount());
  }

  private constructCoreObservables() {
    // First set up all the base observables
    this.app$ = this.appEntityService.waitForEntity$;
    const moreWaiting$ = this.app$.pipe(
      filter(entityInfo => !!(entityInfo.entity && entityInfo.entity.entity && entityInfo.entity.entity.cfGuid)),
      map(entityInfo => entityInfo.entity.entity));
    this.appSpace$ = moreWaiting$.pipe(
      first(),
      switchMap(app => {
        return this.entityServiceFactory.create<APIResource<ISpace>>(
          spaceSchemaKey,
          entityFactory(spaceWithOrgKey),
          app.space_guid,
          new GetSpace(app.space_guid, app.cfGuid, [createEntityRelationKey(spaceSchemaKey, organizationSchemaKey)], true)
        ).waitForEntity$.pipe(
          map(entityInfo => entityInfo.entity)
        );
      })
    );
    this.appOrg$ = moreWaiting$.pipe(
      first(),
      switchMap(app => this.appSpace$.pipe(
        map(space => space.entity.organization_guid),
        switchMap(orgGuid => {
          return this.store.select(selectEntity(organizationSchemaKey, orgGuid));
        }),
        filter(org => !!org)
      ))
    );

    this.isDeletingApp$ = this.appEntityService.isDeletingEntity$.pipe(publishReplay(1), refCount());

    this.waitForAppEntity$ = this.appEntityService.waitForEntity$.pipe(publishReplay(1), refCount());

    this.appSummary$ = this.waitForAppEntity$.pipe(
      switchMap(() => this.appSummaryEntityService.entityObs$),
      publishReplay(1),
      refCount()
    );

    this.appEnvVars = this.appEnvVarsService.createEnvVarsObs(this.appGuid, this.cfGuid);
  }

  private constructAmalgamatedObservables() {
    // Assign/Amalgamate them to public properties (with mangling if required)
    const action = new GetAppStatsAction(this.appGuid, this.cfGuid);
    const appStats = getPaginationObservables<APIResource<AppStat>>({
      store: this.store,
      action,
      paginationMonitor: this.paginationMonitorFactory.create(
        action.paginationKey,
        entityFactory(appStatsSchemaKey)
      )
    }, true);
    // This will fail to fetch the app stats if the current app is not running but we're
    // willing to do this to speed up the initial fetch for a running application.
    this.appStats$ = appStats.entities$;

    this.appStatsFetching$ = appStats.pagination$.pipe(publishReplay(1), refCount());

    this.application$ = this.waitForAppEntity$.pipe(
      combineLatest(this.store.select(endpointEntitiesSelector)),
      filter(([{ entity, entityRequestInfo }, endpoints]: [EntityInfo, any]) => {
        return entity && entity.entity && entity.entity.cfGuid;
      }),
      map(([{ entity, entityRequestInfo }, endpoints]: [EntityInfo, any]): ApplicationData => {
        return {
          fetching: entityRequestInfo.fetching,
          app: entity,
          stack: entity.entity.stack,
          cf: endpoints[entity.entity.cfGuid],
        };
      }), publishReplay(1), refCount());

    this.applicationState$ = this.waitForAppEntity$.pipe(
      combineLatest(this.appStats$.pipe(startWith(null))),
      map(([appInfo, appStatsArray]: [EntityInfo, APIResource<AppStat>[]]) => {
        return this.appStateService.get(appInfo.entity.entity, appStatsArray ? appStatsArray.map(apiResource => apiResource.entity) : null);
      }), publishReplay(1), refCount());

    this.applicationStratProject$ = this.appEnvVars.entities$.pipe(map(applicationEnvVars => {
      return this.appEnvVarsService.FetchStratosProject(applicationEnvVars[0].entity);
    }), publishReplay(1), refCount());

    this.applicationRunning$ = this.application$.pipe(
      map(app => app ? app.app.entity.state === 'STARTED' : false)
    );

  }

  private constructStatusObservables() {
    this.isFetchingApp$ = this.appEntityService.isFetchingEntity$;

    this.isUpdatingApp$ = this.appEntityService.entityObs$.pipe(map(a => {
      const updatingRoot = a.entityRequestInfo.updating[rootUpdatingKey] || { busy: false };
      const updatingSection = a.entityRequestInfo.updating[UpdateExistingApplication.updateKey] || { busy: false };
      return !!updatingRoot.busy || !!updatingSection.busy;
    }));

    this.isFetchingEnvVars$ = this.appEnvVars.pagination$.pipe(
      map(ev => getCurrentPageRequestInfo(ev).busy),
      startWith(false),
      publishReplay(1),
      refCount());

    this.isUpdatingEnvVars$ = this.appEnvVars.pagination$.pipe(map(
      ev => getCurrentPageRequestInfo(ev).busy && ev.ids[ev.currentPage]
    ), startWith(false), publishReplay(1), refCount());

    this.isFetchingStats$ = this.appStatsFetching$.pipe(map(
      appStats => appStats ? getCurrentPageRequestInfo(appStats).busy : false
    ), startWith(false), publishReplay(1), refCount());

    this.applicationUrl$ = this.appSummaryEntityService.entityObs$.pipe(
      map(({ entity }) => entity),
      map(app => {
        const routes = app && app.entity.routes ? app.entity.routes : [];
        const nonTCPRoutes = routes.filter(p => p && !isTCPRoute(p));
        if (nonTCPRoutes.length > 0) {
          return nonTCPRoutes[0];
        }
        return null;
      }),
      map(entRoute => {
        if (!!entRoute && !!entRoute.entity && !!entRoute.entity.domain) {
          return getRoute(entRoute, true, false, {
            entityRequestInfo: undefined,
            entity: entRoute.entity.domain
          });
        }
        return null;
      })
    );
  }


  isEntityComplete(value, requestInfo: { fetching: boolean }): boolean {
    if (requestInfo) {
      return !requestInfo.fetching;
    } else {
      return !!value;
    }
  }

  /*
  * Update an application
  */
  updateApplication(
    updatedApplication: UpdateApplication,
    updateEntities?: AppMetadataTypes[],
    existingApplication?: IApp): Observable<ActionState> {
    this.store.dispatch(new UpdateExistingApplication(
      this.appGuid,
      this.cfGuid,
      { ...updatedApplication },
      existingApplication,
      updateEntities
    ));

    // Create an Observable that can be used to determine when the update completed
    const actionState = selectUpdateInfo(applicationSchemaKey,
      this.appGuid,
      UpdateExistingApplication.updateKey);
    return this.store.select(actionState).pipe(filter(item => !item.busy));
  }
}
