import { ComponentModel } from "../../../editor-core";


const Button = () => { 
  return <div>Button</div>;
}

const ViewButton = () => {
  return <div>Button</div>;
}

const rules = [
  { required: true },
];

const buttonComponent = new ComponentModel({
  name: 'button',
  label: '按钮',
  icon: '',
  properties: [
    { name: 'fontSize', label: 'gift字体大小',  type: 'input', rules },
    { name: 'paddingTop', label: 'gift上边距',  type: 'number', rules },
  ],
  dataFields: [
    { name: 'id' },
    { name: 'text' },
  ],
  actions: [],
  events: [],
  Component: Button,
  ViewComponent: ViewButton,
});


export default buttonComponent;
