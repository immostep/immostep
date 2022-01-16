import { useState } from 'react';
import Chart from 'react-apexcharts';
import generateDayWiseTimeSeries from './lib/utils.mjs';

function ChartViewsByGood() {
  const [options] = useState({
    chart: {
      id: 'viewsByGood',
      toolbar: {
        show: false
      },
      fontFamily: 'Nunito'
    },
    // xaxis: {
    //   categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc']
    // },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      min: 0,
      max: 200
    },
    stroke: {
      width: 3
    },
    colors: ['#14b8a6', '#0ea5e9', '#ec4899', '#facc15'],
    legend: {
      show: true,
      fontSize: '14px'
    },
    dataLabels: {
      enabled: false
    }
  });

  const [series] = useState([
    {
      name: 'Logement #01',
      data: generateDayWiseTimeSeries(new Date('01 Jan 2021').getTime(), 365, {
        min: 0,
        max: 50
      })
    },
    {
      name: 'Logement #02',
      data: generateDayWiseTimeSeries(new Date('01 Jan 2021').getTime(), 365, {
        min: 80,
        max: 105
      })
    },
    {
      name: 'Logement #03',
      data: generateDayWiseTimeSeries(new Date('01 Jan 2021').getTime(), 365, {
        min: 158,
        max: 190
      })
    },
    {
      name: 'Logement #04',
      data: generateDayWiseTimeSeries(new Date('01 Jan 2021').getTime(), 365, {
        min: 80,
        max: 105
      })
    }
  ]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="area" height="250" />
        </div>
      </div>
    </div>
  );
}

export default ChartViewsByGood;
