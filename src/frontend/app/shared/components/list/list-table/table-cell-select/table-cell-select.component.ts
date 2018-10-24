import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RowState } from '../../data-sources-controllers/list-data-source-types';
import { TableCellCustom } from '../../list.types';


@Component({
  selector: 'app-table-cell-select',
  templateUrl: './table-cell-select.component.html',
  styleUrls: ['./table-cell-select.component.scss']
})
export class TableCellSelectComponent<T> extends TableCellCustom<T> implements OnInit {

  disable$: Observable<boolean>;

  @Input()
  rowState: Observable<RowState>;

  ngOnInit() {
    this.disable$ = this.rowState.pipe(
      map(state => state.disabled)
    );
  }
}
