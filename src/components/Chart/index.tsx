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
      height: 'auto',
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
    grid: {
      show: false,
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
    toolbar: {
      show: true,
      tools: {
        download: '<img alt="pera" src="https://picsum.photos/60" class="ico-download" width="50">',
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

  const renderHeight = () => {
    if (window.innerWidth > 992) {
      return window.innerHeight - 500;
    }
    return 400;
  };

  return (
    <div className="chart-container">
      <div className="responsive-chart">
        <ReactApexChart options={options} series={series} height={renderHeight()} />
      </div>
    </div>
  );
};

export default Chart;
