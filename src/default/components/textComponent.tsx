import React from 'react';
import { ComponentModel } from "../../editor-core";
import { IComponentProps } from "../../editor-core/interface";

const Component = ({ properties }: IComponentProps) => {
  const { color = '#fff' } = properties;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        fontSize: parseInt(properties.fontSize) || 14,
        color: color,
        textAlign: 'center',
      }}
    >
      {properties.text || '文字'}
    </div>
  );
}


const activeRingChartComponent = new ComponentModel({
  name: 'text',
  label: '文字',
  icon: require('../icons/text.png'),
  properties: [
    { name: 'text', label: '内容',  type: 'input' },
    { name: 'fontSize', label: '字体大小',  type: 'number' },
    { name: 'color', label: '字体颜色',  type: 'color' },
  ],
  defaultSize: { width: 100, height: 30 },
  dataFields: [],
  actions: [],
  events: [],
  Component: Component,
  ViewComponent: Component,
});


export default activeRingChartComponent;
