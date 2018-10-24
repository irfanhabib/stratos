import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { pathGet } from '../../../../../core/utils.service';
import { TableCellCustom } from '../../list.types';
import { objectHelper } from './../../../../../core/helper-classes/object.helpers';
import { ICellDefinition } from './../table.types';

@Component({
  moduleId: module.id,
  selector: 'app-table-cell-default',
  templateUrl: 'app-table-cell-default.component.html',
  styleUrls: ['app-table-cell-default.component.scss']
})
export class TableCellDefaultComponent<T> extends TableCellCustom<T> implements OnDestroy {

  public cellDefinition: ICellDefinition<T>;

  private _row: T;
  @Input('row')
  get row() { return this._row; }
  set row(row: T) {
    this._row = row;
    if (row) {
      this.setValue(row);
    }
  }

  private asyncSub: Subscription;

  public valueContext = { value: null };
  public isLink = false;
  public isExternalLink = false;
  public linkValue: string;
  public linkTarget = '_self';
  public valueGenerator: (row: T) => string;

  public init() {
    this.setValueGenerator();
    this.setValue(this.row);
    this.setSyncLink();
  }

  private setupLinkDeps() {
    if (this.cellDefinition.newTab) {
      this.linkTarget = '_blank';
    }
    this.isExternalLink = this.isLink && this.cellDefinition.externalLink;
  }

  private setSyncLink() {
    if (!this.cellDefinition.getLink) {
      return;
    }
    this.isLink = true;
    this.linkValue = this.cellDefinition.getLink(this.row);
    this.setupLinkDeps();
  }

  private setupAsyncLink(value) {
    if (!this.cellDefinition.getAsyncLink) {
      return;
    }
    this.isLink = true;
    this.linkValue = this.cellDefinition.getAsyncLink(value);
    this.setupLinkDeps();
  }

  private setupAsync(row) {
    if (this.asyncSub) {
      return;
    }
    const asyncConfig = this.cellDefinition.asyncValue;
    this.asyncSub = row[asyncConfig.pathToObs].subscribe(value => {
      this.valueContext.value = pathGet(asyncConfig.pathToValue, value);
      this.setupAsyncLink(value);
    });
  }

  private setValue(row: T) {
    if (this.cellDefinition && this.cellDefinition.asyncValue) {
      this.setupAsync(row);
    } else if (this.valueGenerator) {
      this.valueContext.value = this.valueGenerator(row);
    }
  }

  private setValueGenerator() {
    this.valueGenerator = this.getValueGenerator(this.cellDefinition);
  }

  private getValueGenerator(cellDefinition: ICellDefinition<T>) {
    return this.getValueGetter(cellDefinition);
  }

  private getValueGetter(cellDefinition: ICellDefinition<T>) {
    if (cellDefinition.getValue) {
      return cellDefinition.getValue;
    } else if (cellDefinition.valuePath) {
      return (row: T) => objectHelper.getPathFromString(row, cellDefinition.valuePath);
    }
    return null;
  }

  ngOnDestroy() {
    if (this.asyncSub) {
      this.asyncSub.unsubscribe();
    }
  }

}
