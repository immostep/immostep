import { useState } from 'react';
import Chart from 'react-apexcharts';

function ChartTrafic() {
  const [options] = useState({
    chart: {
      id: 'traffic',
      toolbar: {
        show: false
      },
      fontFamily: 'Nunito'
    },
    xaxis: {
      categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    },
    colors: ['#428dc2', '#92c1e3'],
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
      name: 'Utilisateurs',
      data: [203, 156, 99, 251, 305, 247, 256]
    },
    {
      name: 'Utilisateurs uniques',
      data: [123, 34, 39, 128, 230, 96, 198]
    }
  ]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" height="250" />
        </div>
      </div>
    </div>
  );
}

export default ChartTrafic;
