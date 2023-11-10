import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { IChartData } from '../../services/interface';
import { ApexChartSeries, ApexChartSeriesData } from './constants';

interface ChartProps {
  chartData: IChartData[][];
}

const Chart: React.FC<ChartProps> = ({ chartData }) => {
  const options: any = {
    chart: {
      animations: {
        enabled: false,
      },
      background: '#FFFFFF',
    },
    stroke: {
      width: 3,
      curve: 'straight',
    },
    fill: {
      opacity: 0.7,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'top',
      containerMargin: {
        top: 300,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: false,
      },
    },
    xaxis: {
      tickPlacement: 'on',
      labels: {
        show: false,
      },
      title: {
        text: 'Time',
      },
    },
    yaxis: {
      title: {
        text: 'Relative change',
      },
    },
  };

  const series: ApexChartSeries[] = chartData ? Object.values(chartData).map((data, index) => {
    const seriesData: ApexChartSeriesData[] = data.map((item) => ({
      x: item.time,
      y: parseFloat(item.x.toFixed(2)),
    }));
    return {
      name: `Point ${index + 1}`,
      data: seriesData,
    };
  }) : [];

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} />;
    </div>
  );
};

export default Chart;
