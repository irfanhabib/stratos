import { DataSource } from '@angular/cdk/table';
import { Action } from '@ngrx/store';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { IRequestEntityTypeState } from '../../../../store/app-state';
import { PaginationEntityState } from '../../../../store/types/pagination.types';

export interface AppEvent {
  actee_name: string;
  actee_type: string;
  actor: string;
  actor_name: string;
  actor_type: string;
  actor_username: string;
  metadata: Object;
  organization_guid: string;
  space_guid: string;
  timestamp: string;
  type: string;
}

export class ListActionConfig<T> {
  createAction: (
    dataSource: IListDataSource<T>,
    items: IRequestEntityTypeState<T>
  ) => Action;
  icon: string;
  label: string;
  description: string;
  visible: (row: T) => boolean;
  enabled: (row: T) => boolean;
}

interface ICoreListDataSource<T> extends DataSource<T> {
  rowsState?: Observable<RowsState>;
  getRowState?(row: T): Observable<RowState>;
  trackBy(index: number, item: T);
}

export interface ITableListDataSource<T> extends ICoreListDataSource<T> {
  isTableLoading$: Observable<boolean>;
}

export interface IListDataSource<T> extends ICoreListDataSource<T> {
  pagination$: Observable<PaginationEntityState>;
  isLocal?: boolean;
  localDataFunctions?: ((
    entities: T[],
    paginationState: PaginationEntityState
  ) => T[])[];
  entityKey: string;
  paginationKey: string;

  page$: Observable<T[]>;

  addItem: T;
  isAdding$: BehaviorSubject<boolean>;
  isSelecting$: BehaviorSubject<boolean>;
  isLoadingPage$: Observable<boolean>;

  editRow: T; // Edit items - remove once ng-content can exist in md-table

  selectAllChecked: boolean; // Select items - remove once ng-content can exist in md-table
  selectedRows: Map<string, T>; // Select items - remove once ng-content can exist in md-table
  selectedRows$: ReplaySubject<Map<string, T>>; // Select items - remove once ng-content can exist in md-table
  getRowUniqueId: getRowUniqueId<T>;
  selectAllFilteredRows(); // Select items - remove once ng-content can exist in md-table
  selectedRowToggle(row: T, multiMode?: boolean); // Select items - remove once ng-content can exist in md-table
  selectClear();

  startEdit(row: T); // Edit items - remove once ng-content can exist in md-table
  saveEdit(); // Edit items - remove once ng-content can exist in md-table
  cancelEdit(); // Edit items - remove once ng-content can exist in md-table
  destroy();
  getFilterFromParams(pag: PaginationEntityState): string;
  setFilterParam(filter: string, pag: PaginationEntityState);
  refresh();
}

export type getRowUniqueId<T> = (T) => string;
export interface RowsState {
  [rowUID: string]: RowState;
}

export interface RowState {
  busy?: boolean;
  error?: boolean;
  message?: string;
  blocked?: boolean;
  highlighted?: boolean;
  deleting?: boolean;
  warning?: boolean;
  [customState: string]: any;
}

export const getDefaultRowState = (): RowState => ({
  busy: false,
  error: false,
  blocked: false,
  deleting: false,
  message: null
});
