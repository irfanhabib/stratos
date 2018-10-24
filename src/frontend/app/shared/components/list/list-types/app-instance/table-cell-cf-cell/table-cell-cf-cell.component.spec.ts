import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '../../../../../../core/core.module';
import { UtilsService } from '../../../../../../core/utils.service';
import { EntityInfo } from '../../../../../../store/types/api.types';
import { TableCellCfCellComponent } from './table-cell-cf-cell.component';

describe('TableCellCfCellComponent', () => {
  let component: TableCellCfCellComponent;
  let fixture: ComponentFixture<TableCellCfCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableCellCfCellComponent,
      ],
      imports: [
        CoreModule,
      ],
      providers: [
        UtilsService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent<TableCellCfCellComponent>(TableCellCfCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
