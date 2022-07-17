import React from 'react';
import { schemePaired } from 'd3';
import { ComponentModel } from "../../../editor-core";
import { IComponentProps } from "../../../editor-core/interface";
import ChartJs, { ChartConfiguration } from '../ChartJs';

const Component = ({ properties, dataSource, shape }: IComponentProps) => {
  const { color = '#fff' } = properties;
  const [data, setData] = React.useState([
    { name: '可口可乐', value: 93 },
    { name: '百事可乐', value: 32 },
    { name: '哇哈哈', value: 65 },
    { name: '康师傅', value: 44 }
  ]);


  const getData = React.useCallback(async () => {
    setData((await dataSource.getData() as any));
  }, [dataSource]);
  const config: ChartConfiguration = {
    type: 'pie',
    data: {
      labels: data.map(item => item.name),
      datasets: [{
        label: 'My First Dataset',
        data: data.map(item => item.value),
        backgroundColor: schemePaired,
        hoverOffset: 4,
      }]
    },
    options: {
        color,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                  color,
                }
            },
        }
    }
  };
  React.useEffect(() => {
    getData();
  }, [getData]);
  return (
    <ChartJs config={config} style={{width: '100%', height: '100%'}}></ChartJs>
  );
}


const activeRingChartComponent = new ComponentModel({
  name: 'pieChart',
  label: '饼图',
  icon: require('../../icons/pie-chart.png'),
  properties: [
    { name: 'color', label: '文字颜色',  type: 'color' },
  ],
  defaultSize: { width: 200, height: 200 },
  dataFields: [
    { name: 'name' },
    { name: 'value' },
  ],
  actions: [],
  events: [],
  Component: Component,
  ViewComponent: Component,
});


export default activeRingChartComponent;