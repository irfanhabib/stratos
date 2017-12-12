import { ApplicationSchema } from '../../actions/application.actions';
import { RequestOptions } from '@angular/http';

import {
  ApiActionTypes,
} from '../../actions/request.actions';
import { createPaginationReducer, defaultPaginationState } from './pagination.reducer';
import { PaginatedAction } from '../../types/pagination.types';
import { StartCFAction, WrapperCFActionSuccess, WrapperCFActionFailed } from '../../types/request.types';

function getReducer() {
  return createPaginationReducer([
    ApiActionTypes.API_REQUEST_START,
    ApiActionTypes.API_REQUEST_SUCCESS,
    ApiActionTypes.API_REQUEST_FAILED
  ]);
}

class MockPagAction implements PaginatedAction {
  actions = ['ONE', 'TWO', 'THREE'];
  options = new RequestOptions();
  entity = ApplicationSchema;
  entityKey = ApplicationSchema.key;
  paginationKey = 'PaginationKey';
  type = ApiActionTypes.API_REQUEST;
}

function checkState({ newState, expectedNewState, entityKey, paginationKey }) {
  expect(newState[entityKey]).toBeTruthy();
  const state = newState[entityKey][paginationKey];
  const state2 = expectedNewState[entityKey][paginationKey];
  expect(state).toBeTruthy();
  expect(state).toEqual(state2);
}

describe('PaginationReducer', () => {
  it('should return empty state', () => {
    const paginationReducer = getReducer();
    expect(paginationReducer(null, { type: 'FAKE_NEWS' })).toEqual(defaultPaginationState);
    expect(paginationReducer(null, { type: ApiActionTypes.API_REQUEST })).toEqual(defaultPaginationState);
  });

  it('should return fetching state', () => {
    const paginationReducer = createPaginationReducer([
      ApiActionTypes.API_REQUEST_START,
      ApiActionTypes.API_REQUEST_SUCCESS,
      ApiActionTypes.API_REQUEST_FAILED
    ]);
    const entityKey = ApplicationSchema.key;
    const paginationKey = 'PaginationKey';
    const apiAction = new MockPagAction();
    apiAction.entityKey = entityKey;
    apiAction.paginationKey = paginationKey;

    const startApiAction = new StartCFAction(apiAction, 'fetch');
    const newState = paginationReducer(
      {
        ...defaultPaginationState,
        [ApplicationSchema.key]: {
          [paginationKey]: {
            fetching: false,
            pageCount: 0,
            currentPage: 1,
            ids: {},
            error: true,
            message: 'aasdasdasd'
          }
        }
      }, startApiAction);
    const expectedNewState = {
      ...defaultPaginationState,
      [ApplicationSchema.key]: {
        [paginationKey]: {
          fetching: true,
          pageCount: 0,
          currentPage: 1,
          ids: {},
          error: false,
          message: ''
        }
      }
    };
    checkState({
      newState,
      expectedNewState,
      entityKey,
      paginationKey
    });
  });

  it('should return success state', () => {

    const paginationReducer = getReducer();

    const entityKey = 'EntityKey';
    const paginationKey = 'PaginationKey';

    const successApiAction = new WrapperCFActionSuccess(
      {
        entities: {},
        result: [
          1,
          2
        ]
      },
      {
        entityKey,
        paginationKey,
        type: 'type',
        entity: {},
        options: {}
      },
      'fetch'
    );
    const newState = paginationReducer({
      ...defaultPaginationState,
      [entityKey]: {
        [paginationKey]: {
          fetching: true,
          pageCount: 0,
          totalResults: 0,
          currentPage: 1,
          ids: {},
          error: true,
          message: 'asdasdasdasd'
        }
      }
    }, successApiAction);
    const expectedNewState = {
      [entityKey]: {
        [paginationKey]: {
          fetching: false,
          pageCount: 1,
          totalResults: 2,
          currentPage: 1,
          ids: {
            1: [1, 2]
          },
          error: false,
          message: ''
        }
      }
    };
    checkState({
      newState,
      expectedNewState,
      entityKey,
      paginationKey
    });
  });


  it('should return failed state', () => {

    const paginationReducer = getReducer();

    const entityKey = 'EntityKey';
    const paginationKey = 'PaginationKey';
    const message = 'Failed';

    const failedApiAction = new WrapperCFActionFailed(
      message,
      {
        entityKey,
        paginationKey,
        type: 'type',
        entity: {}
      },
      'fetch'
    );
    const newState = paginationReducer({
      ...defaultPaginationState,
      [entityKey]: {
        [paginationKey]: {
          fetching: true,
          pageCount: 0,
          currentPage: 1,
          totalResults: 0,
          ids: {},
          error: false,
          message: 'asdasdasdasd'
        }
      }
    }, failedApiAction);
    const expectedNewState = {
      [entityKey]: {
        [paginationKey]: {
          fetching: false,
          pageCount: 0,
          currentPage: 1,
          totalResults: 0,
          ids: {},
          error: true,
          message: message
        }
      }
    };
    checkState({
      newState,
      expectedNewState,
      entityKey,
      paginationKey
    });
  });
});
