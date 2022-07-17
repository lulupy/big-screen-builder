import React from 'react';
import ChartJs, { ChartConfiguration } from '../../default/components/ChartJs';


const BarDemo = () => {
  const config: ChartConfiguration = {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'tes'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 4],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            },
        }
    }
  };

  return (
    <div style={{width: 500, height: 500}}>
      <ChartJs config={config} style={{width: '100%', height: '100%'}}></ChartJs>
    </div>
  );
}


const DoughnutDemo = () => {
  const config: ChartConfiguration = {
    type: 'pie',
    data: {
      labels: [
        'Red',
        'Blue',
        'Yellow',
        'test'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4
      }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            },
        }
    }
  };

  return (
    <div style={{width: 500, height: 500}}>
      <ChartJs config={config} style={{width: '100%', height: '100%'}}></ChartJs>
    </div>
  );
}


const LineDemo = () => {
  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: [
        'Red',
        'Blue',
        'Yellow',
        'test'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            },
        }
    }
  };

  return (
    <div style={{width: 500, height: 500}}>
      <ChartJs config={config} style={{width: '100%', height: '100%'}}></ChartJs>
    </div>
  );
}
const Demo = () => {
  return <LineDemo />;
}

export default Demo;