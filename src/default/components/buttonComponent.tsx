import { ComponentModel } from "../../editor-core";
import { IViewComponentProps } from "../../editor-core/interface";


const Button = ({}) => { 
  return <div>Button</div>;
}

const ViewButton = ({ eventBus }: IViewComponentProps) => {
  return (
    <div onClick={() => {
      console.log('click');
      eventBus.emit('click');
    }}>
      Button
    </div>
  );
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
  defaultSize: { width: 100, height: 50 },
  dataFields: [
    { name: 'id' },
    { name: 'text' },
  ],
  actions: [],
  events: [
    { name: 'click', label: '点击', description: '点击按钮' },
    { name: 'clic1', label: '点击2', description: '测试' },
  ],
  Component: Button,
  ViewComponent: ViewButton,
});


export default buttonComponent;
