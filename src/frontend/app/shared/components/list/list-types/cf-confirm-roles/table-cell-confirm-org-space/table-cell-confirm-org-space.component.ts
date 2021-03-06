import { Component, Input } from '@angular/core';

import { CfRoleChangeWithNames } from '../../../../../../store/types/users-roles.types';
import { AppChip } from '../../../../chips/chips.component';
import { TableCellCustom } from '../../../list.types';

@Component({
  selector: 'app-table-cell-confirm-org-space',
  templateUrl: './table-cell-confirm-org-space.component.html',
  styleUrls: ['./table-cell-confirm-org-space.component.scss']
})
export class TableCellConfirmOrgSpaceComponent extends TableCellCustom<CfRoleChangeWithNames> {
  chipsConfig: AppChip<CfRoleChangeWithNames>[];
  @Input('row')
  set row(row: CfRoleChangeWithNames) {
    const chipConfig = new AppChip<CfRoleChangeWithNames>();
    chipConfig.key = row;
    chipConfig.value = row.spaceGuid ? `Space: ${row.spaceName}` : `Org: ${row.orgName}`;
    this.chipsConfig = [chipConfig];
  }
}
