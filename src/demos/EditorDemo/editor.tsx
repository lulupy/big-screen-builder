import { Input, InputNumber } from 'antd';
import { EditorModel } from '../../editor';
import buttonComponent from './components/buttonComponent';
import imageComponent from './components/imageComponent';



const editor = new EditorModel();

editor.resisterComponent('button', buttonComponent);
editor.resisterComponent('image', imageComponent);

editor.resisterInputType('input', <Input />);
editor.resisterInputType('number', <InputNumber />);

export default editor;