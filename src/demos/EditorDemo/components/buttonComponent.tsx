import { ComponentModel } from "../../../editor";


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
  actions: [],
  events: [],
  dataFields: [],
  Component: Button,
  ViewComponent: ViewButton,
});


export default buttonComponent;
