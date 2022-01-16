import { useState } from 'react';
import Chart from 'react-apexcharts';

const loyers = [2000, 5110, 2360, 1450, 2510, 3620, 5410, 6210, 3230, 2560, 2300, 2530];
const depenses = [200, 0, 236, 145, 610, 1200, 541, 4120, 0, 0, 230, 0];

function ChartFinances() {
  const [options] = useState({
    chart: {
      id: 'benefices',
      toolbar: {
        show: false
      },
      fontFamily: 'Nunito',
      stacked: false
    },
    stroke: {
      width: [0, 0, 4],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    xaxis: {
      categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc']
    },
    colors: ['#2dd4bf', '#fda4af', '#facc15'],
    yaxis: [
      {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      }
    ],
    markers: {
      size: 0
    },
    legend: {
      show: true,
      fontSize: '14px'
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      shared: true,
      intersect: false
    }
  });

  const [series] = useState([
    {
      name: 'Loyers',
      type: 'column',
      data: loyers
    },
    {
      name: 'Dépenses',
      type: 'column',
      data: depenses
    },
    {
      name: 'Bénéfices',
      type: 'line',
      data: loyers.map((l, i) => l - depenses[i])
    }
  ]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="line" height="250" />
        </div>
      </div>
    </div>
  );
}

export default ChartFinances;
