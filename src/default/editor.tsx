import { Input, InputNumber } from 'antd';
import { EditorModel } from '../editor-core';
import buttonComponent from './components/buttonComponent';
import imageComponent from './components/imageComponent';
import testComponent from './components/testComponent';



const editor = new EditorModel();

editor.resisterComponent('button', buttonComponent);
editor.resisterComponent('image', imageComponent);
editor.resisterComponent('test', testComponent);

editor.resisterInputType('input', <Input />);
editor.resisterInputType('number', <InputNumber />);

export default editor;