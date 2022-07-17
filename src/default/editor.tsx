import { Input, InputNumber } from 'antd';
import { EditorModel, PageModel } from '../editor-core';
import buttonComponent from './components/buttonComponent';
import imageComponent from './components/imageComponent';
import tableComponent from './components/tableComponent';
import testComponent from './components/testComponent';

import box1Component from './components/box1Component';
import box3Component from './components/box3Component';
import decoration1Component from './components/decoration1Component';
import decoration2Component from './components/decoration2Component';
import capsuleChartComponent from './components/capsuleChartComponent';
import activeRingChartComponent from './components/activeRingChartComponent';
import pieChartComponent from './components/pieChartComponent';

import textComponent from './components/textComponent';
import ColorPicker from '../editor-core/components/ColorPicker';



const editor = new EditorModel();

editor.resisterComponent('button', buttonComponent);
editor.resisterComponent('image', imageComponent);
editor.resisterComponent('test', testComponent);
editor.resisterComponent('table', tableComponent);
editor.resisterComponent('box1', box1Component);
editor.resisterComponent('box3', box3Component);
editor.resisterComponent('decoration1', decoration1Component);
editor.resisterComponent('decoration2', decoration2Component);
editor.resisterComponent('capsuleChart', capsuleChartComponent);
editor.resisterComponent('activeRingChart', activeRingChartComponent);
editor.resisterComponent('pieChart', pieChartComponent);
editor.resisterComponent('text', textComponent);

editor.resisterInputType('input', <Input />);
editor.resisterInputType('number', <InputNumber />);
editor.resisterInputType('color', <ColorPicker />);

// 之前创建page的逻辑放在组件中, 由于组件可能会多次运行, 这段逻辑也会多次执行
const data = localStorage.getItem('data');
if(data) {
  editor.deserializePage(JSON.parse(data))
} else {
  const page = new PageModel();
  editor.setPage(page);
}

export default editor;