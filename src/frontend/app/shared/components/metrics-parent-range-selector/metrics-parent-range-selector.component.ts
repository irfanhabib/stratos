import { AfterContentInit, Component, ContentChildren, OnDestroy, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';

import { entityFactory, metricSchemaKey } from '../../../store/helpers/entity-factory';
import { IMetrics } from '../../../store/types/base-metric.types';
import { EntityMonitorFactory } from '../../monitors/entity-monitor.factory.service';
import { MetricsRangeSelectorManagerService } from '../../services/metrics-range-selector-manager.service';
import { MetricQueryType } from '../../services/metrics-range-selector.types';
import { MetricsChartComponent } from '../metrics-chart/metrics-chart.component';

@Component({
  selector: 'app-metrics-parent-range-selector',
  templateUrl: './metrics-parent-range-selector.component.html',
  styleUrls: ['./metrics-parent-range-selector.component.scss'],
  providers: [
    MetricsRangeSelectorManagerService
  ]
})
export class MetricsParentRangeSelectorComponent implements AfterContentInit, OnDestroy {
  private actionSub: Subscription;

  @ContentChildren(MetricsChartComponent)
  private metricsCharts: QueryList<MetricsChartComponent>;

  public rangeTypes = MetricQueryType;

  constructor(
    private entityMonitorFactory: EntityMonitorFactory,
    public rangeSelectorManager: MetricsRangeSelectorManagerService
  ) { }

  ngAfterContentInit() {
    if (!this.metricsCharts || !this.metricsCharts.first) {
      return;
    }
    const action = this.metricsCharts.first.metricsConfig.metricsAction;
    const metricsMonitor = this.entityMonitorFactory.create<IMetrics>(
      action.metricId,
      metricSchemaKey,
      entityFactory(metricSchemaKey)
    );
    this.rangeSelectorManager.init(metricsMonitor, action);
    this.actionSub = this.rangeSelectorManager.metricsAction$.subscribe(newAction => {
      if (newAction) {
        this.metricsCharts.forEach(chart => {
          const oldAction = chart.metricsConfig.metricsAction;
          chart.metricsAction = {
            ...oldAction,
            query: {
              ...oldAction.query,
              params: newAction.query.params
            },
            queryType: newAction.queryType
          };
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.actionSub) {
      this.actionSub.unsubscribe();
    }
  }

}
