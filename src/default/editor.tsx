import { Input, InputNumber } from 'antd';
import { EditorModel, PageModel } from '../editor-core';
import buttonComponent from './components/buttonComponent';
import imageComponent from './components/imageComponent';
import tableComponent from './components/tableComponent';
import testComponent from './components/testComponent';



const editor = new EditorModel();

editor.resisterComponent('button', buttonComponent);
editor.resisterComponent('image', imageComponent);
editor.resisterComponent('test', testComponent);
editor.resisterComponent('table', tableComponent);

editor.resisterInputType('input', <Input />);
editor.resisterInputType('number', <InputNumber />);

// 之前创建page的逻辑放在组件中, 由于组件可能会多次运行, 这段逻辑也会多次执行
const data = localStorage.getItem('data');
if(data) {
  editor.deserializePage(JSON.parse(data))
} else {
  const page = new PageModel();
  editor.setPage(page);
}

export default editor;