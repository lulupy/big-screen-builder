import React from 'react';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js';

import type { ChartConfiguration } from 'chart.js';
export type { ChartConfiguration } from 'chart.js';



Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);
// 全局设置文字颜色
// Chart.defaults.color = "#fff";
interface IChartJsProps  {
  config: ChartConfiguration,
  style?: React.CSSProperties,
}
const ChartJs = React.memo(({
  config, style
}: IChartJsProps) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if(!ref.current) return;
    const ctx:any = ref.current;
    if(ctx.__chartjsConfig === JSON.stringify(config)) return;
    if(ctx.__chartjsInstance) {
      ctx.__chartjsInstance.destroy();
    }
    // `new Chart(config)`会复用config对象, 会修改config对象, 所以将原始config对象以字符串保存, 方便后面比较
    ctx.__chartjsConfig = JSON.stringify(config);
    ctx.__chartjsInstance = new Chart(ctx, config);
  }, [config]);
  return (
    <div style={style}>
      <canvas ref={ref}></canvas>
    </div>
  );
});


export default ChartJs;
