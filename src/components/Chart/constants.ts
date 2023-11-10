export interface ApexChartSeriesData {
  x: number | null;
  y: number;
}

export interface ApexChartSeries {
  name?: string;
  data: ApexChartSeriesData[];
}
