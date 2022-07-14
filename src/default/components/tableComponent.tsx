import React from 'react';
import { ComponentModel } from "../../editor-core";
import { IComponentProps } from '../../editor-core/interface';




const Table = ({ dataSource }: IComponentProps) => {
  return <div>Table</div>;
}

const ViewTable = ({ eventBus }: IComponentProps) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const lisener = () => {
      setCount(count =>  1 + count);
    }
    eventBus.on('refresh', lisener);
    return () => {
      eventBus.off('refresh', lisener);
    };
  }, []);
  return <div>Table: {count}</div>;
}

const rules = [
  { required: true },
];

const tableComponent = new ComponentModel({
  name: 'table',
  label: '表格',
  icon: '',
  properties: [
    { name: 'fontSize', label: 'gift字体大小',  type: 'input', rules },
    { name: 'paddingTop', label: 'gift上边距',  type: 'number', rules },
  ],
  dataFields: [
    { name: 'id' },
    { name: 'text' },
  ],
  actions: [
    { name: 'refresh', label: '刷新' },
  ],
  events: [],
  Component: Table,
  ViewComponent: ViewTable,
});


export default tableComponent;