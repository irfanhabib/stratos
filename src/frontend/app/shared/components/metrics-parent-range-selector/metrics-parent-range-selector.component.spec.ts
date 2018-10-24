import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DateFormatPipe } from 'ngx-moment';

import { CoreModule } from '../../../core/core.module';
import { createBasicStoreModule } from '../../../test-framework/store-test-helper';
import { EntityMonitorFactory } from '../../monitors/entity-monitor.factory.service';
import { MetricsRangeSelectorService } from '../../services/metrics-range-selector.service';
import { DateTimeComponent } from '../date-time/date-time.component';
import { StartEndDateComponent } from '../start-end-date/start-end-date.component';
import { MetricsParentRangeSelectorComponent } from './metrics-parent-range-selector.component';

describe('MetricsParentRangeSelectorComponent', () => {
  let component: MetricsParentRangeSelectorComponent;
  let fixture: ComponentFixture<MetricsParentRangeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetricsParentRangeSelectorComponent, StartEndDateComponent, DateFormatPipe, DateTimeComponent],
      imports: [
        CoreModule,
        createBasicStoreModule(),
        NoopAnimationsModule
      ],
      providers: [MetricsRangeSelectorService, EntityMonitorFactory]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsParentRangeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
