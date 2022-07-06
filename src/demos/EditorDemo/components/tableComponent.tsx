import React from 'react';
import { ComponentModel } from "../../../editor-core";




const Table = ({ dataConfigVlaue } : any) => {
  const {
    dataSoure,
    
  } = dataConfigVlaue;
  React.useEffect(() => {

  });
  return <div>Table</div>;
}

const ViewTable = () => {
  return <div>Table</div>;
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
  actions: [],
  events: [],
  Component: Table,
  ViewComponent: ViewTable,
});


export default tableComponent;