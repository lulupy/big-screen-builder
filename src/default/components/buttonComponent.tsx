import { Button as AntButton } from 'antd';
import { ComponentModel } from "../../editor-core";
import { IComponentProps } from "../../editor-core/interface";



const Button = ({ eventBus }: IComponentProps) => { 
  return (
    <AntButton
      onClick={() => eventBus.emit('click')}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      button
    </AntButton>
  );
}

const buttonComponent = new ComponentModel({
  name: 'button',
  label: '按钮',
  icon: '',
  properties: [],
  defaultSize: { width: 100, height: 50 },
  actions: [],
  events: [
    { name: 'click', label: '点击', description: '点击按钮' },
  ],
  Component: Button,
  ViewComponent: Button,
});


export default buttonComponent;
