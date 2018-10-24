import { MetricQueryConfig } from '../actions/metrics.actions';
import { MetricQueryType } from '../../shared/services/metrics-range-selector.types';

export enum MetricResultTypes {
  MATRIX = 'matrix',
  VECTOR = 'vector',
  SCALAR = 'scalar',
  STRING = 'string'
}

export interface IMetricsResponse<T = any> {
  status: string;
  data: IMetrics<T>;
}

export interface IMetricsData<T = any> {
  resultType: string;
  result: [T];
}
export interface IMetrics<T = any> {
  query: MetricQueryConfig;
  queryType: MetricQueryType;
  data: IMetricsData<T>;
}

interface IVectorResult<T> {
  metric: T;
}
// [unixTimeStamp, sampleValue]
export type IMetricSample = [number, string];

export interface IMetricMatrixResult<T = any> extends IVectorResult<T> {
  values: IMetricSample[];
}

export interface IMetricVectorResult<T = any> extends IVectorResult<T> {
  value: IMetricSample;
}

// They're the same interface but I'm going to keep both for continuity.
export type IMetricScalarResult = IMetricSample[];
export type IMetricStringsResult = IMetricSample[];

export interface ChartSeries<T = any> {
  name: string;
  series: {
    name: string | Date;
    value: T;
  }[];
}
