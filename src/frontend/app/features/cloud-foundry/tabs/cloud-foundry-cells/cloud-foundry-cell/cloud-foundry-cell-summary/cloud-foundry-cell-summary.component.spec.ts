import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs';

import { BaseTestModules } from '../../../../../../test-framework/cloud-foundry-endpoint-service.helper';
import { ActiveRouteCfCell } from '../../../../cf-page.types';
import { CloudFoundryCellService } from '../cloud-foundry-cell.service';
import { CloudFoundryCellSummaryComponent } from './cloud-foundry-cell-summary.component';
import { MetricQueryType } from '../../../../../../shared/services/metrics-range-selector.types';
import { MetricsChartHelpers } from '../../../../../../shared/components/metrics-chart/metrics.component.helpers';
import { FetchCFCellMetricsAction, MetricQueryConfig } from '../../../../../../store/actions/metrics.actions';
import { MetricsConfig } from '../../../../../../shared/components/metrics-chart/metrics-chart.component';
import { MetricsLineChartConfig, MetricsChartTypes } from '../../../../../../shared/components/metrics-chart/metrics-chart.types';

class MockCloudFoundryCellService {
  cfGuid = 'cfGuid';
  cellId = 'cellId';
  cellMetric$ = observableOf({});

  healthy$ = observableOf(null);
  healthyMetricId = observableOf(null);
  cpus$ = observableOf(null);

  usageContainers$ = observableOf(null);
  remainingContainers$ = observableOf(null);
  totalContainers$ = observableOf(null);

  usageDisk$ = observableOf(null);
  remainingDisk$ = observableOf(null);
  totalDisk$ = observableOf(null);

  usageMemory$ = observableOf(null);
  remainingMemory$ = observableOf(null);
  totalMemory$ = observableOf(null);

  buildMetricConfig = (queryString: string, queryRange: MetricQueryType): MetricsConfig<any> => ({
    getSeriesName: (result: any) => `${result}`,
    mapSeriesItemName: MetricsChartHelpers.getDateSeriesName,
    metricsAction: new FetchCFCellMetricsAction(
      'guid',
      'cellId',
      new MetricQueryConfig(queryString, {}),
      queryRange
    ),
  })
  buildChartConfig = (yAxisLabel: string): MetricsLineChartConfig => ({
    chartType: MetricsChartTypes.LINE,
    xAxisLabel: 'Time',
    yAxisLabel: yAxisLabel,
    showLegend: false,
    autoScale: true
  })

}

describe('CloudFoundryCellSummaryComponent', () => {
  let component: CloudFoundryCellSummaryComponent;
  let fixture: ComponentFixture<CloudFoundryCellSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CloudFoundryCellSummaryComponent,
      ],
      imports: [...BaseTestModules],
      providers: [
        {
          provide: CloudFoundryCellService,
          useValue: new MockCloudFoundryCellService()
        },
        ActiveRouteCfCell
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudFoundryCellSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
