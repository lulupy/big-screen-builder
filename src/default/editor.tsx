import { Input, InputNumber } from 'antd';
import { EditorModel } from '../editor-core';
import buttonComponent from './components/buttonComponent';
// import imageComponent from './components/imageComponent';
// import tableComponent from './components/tableComponent';
// import testComponent from './components/testComponent';

import box1Component from './components/boxs/box1Component';
import box3Component from './components/boxs/box3Component';
import decoration1Component from './components/decorations/decoration1Component';
import decoration2Component from './components/decorations/decoration2Component';
// import capsuleChartComponent from './components/capsuleChartComponent';
// import activeRingChartComponent from './components/activeRingChartComponent';
import pieChartComponent from './components/charts/pieChartComponent';
import lineChartComponent from './components/charts/lineChartComponent';
import barChartComponent from './components/charts/barChartComponent';

import textComponent from './components/textComponent';
import ColorPicker from '../editor-core/components/ColorPicker';



const editor = new EditorModel();

editor.resisterComponent('button', buttonComponent);
// editor.resisterComponent('image', imageComponent);
// editor.resisterComponent('test', testComponent);
// editor.resisterComponent('table', tableComponent);
editor.resisterComponent('box1', box1Component);
editor.resisterComponent('box3', box3Component);
editor.resisterComponent('decoration1', decoration1Component);
editor.resisterComponent('decoration2', decoration2Component);

// editor.resisterComponent('capsuleChart', capsuleChartComponent);
// editor.resisterComponent('activeRingChart', activeRingChartComponent);

editor.resisterComponent('pieChart', pieChartComponent);
editor.resisterComponent('lineChart', lineChartComponent);
editor.resisterComponent('barChart', barChartComponent);
editor.resisterComponent('text', textComponent);

editor.resisterInputType('input', <Input />);
editor.resisterInputType('number', <InputNumber />);
editor.resisterInputType('color', <ColorPicker />);

// ????????????page????????????????????????, ?????????????????????????????????, ??????????????????????????????
const data = localStorage.getItem('data');
if(data) {
  editor.deserializePage(JSON.parse(data))
} 

export default editor;