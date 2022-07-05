import React from "react";
import { ComponentModel } from "../../../editor";
import { IDataSource } from "../../../editor/DataSource/AbstractDataSource";


interface IButtonProps {
  properties: any,
  dataSource: IDataSource | null,
}

const Button = ({ properties, dataSource } : IButtonProps) => {
  const [data, setData] = React.useState<any>(null);
  const getData = React.useCallback(async () => {
    if(dataSource) {
      setData(await dataSource.getData())
    }
  }, [dataSource]);
  React.useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div>
      <span>test</span>
      <pre>{JSON.stringify(properties, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

const ViewButton = () => {
  return <div>Button</div>;
}

const rules = [
  { required: true },
];

const buttonComponent = new ComponentModel({
  name: 'test',
  label: 'test',
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
