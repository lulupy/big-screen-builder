import React from 'react';
import { ComponentModel } from "../../editor-core";
import { CapsuleChart } from "@jiaminghi/data-view-react";
import DataVWrapper from './datav-support/DataVWrapper';
import { IComponentProps } from "../../editor-core/interface";



const Component = ({ properties,shape, dataSource }: IComponentProps) => {
  const [data, setData] = React.useState<Record<string, unknown>[]>([
    {
      name: '南阳',
      value: 167
    },
    {
      name: '周口',
      value: 67
    },
  ]);
  const getData = async () => {
    setData(await dataSource.getData());
  };
  React.useEffect(() => {
    getData();
  }, [dataSource]);
  return (
    <CapsuleChart
      style={{
        height: shape.size.height,
        width: shape.size.width,
      }}
      backgroundColor={properties.backgroundColor}
      config={{ data }}>
      
    </CapsuleChart>
  );
}


const capsuleChartComponent = new ComponentModel({
  name: 'capsuleChart',
  label: '胶囊柱图',
  icon: '',
  properties: [
    { name: 'backgroundColor', label: '背景色	',  type: 'input' },
  ],
  defaultSize: { width: 200, height: 200 },
  dataFields: [
    { name: 'name' },
    { name: 'value' },
  ],
  actions: [],
  events: [],
  Component: Component,
  ViewComponent: Component,
});


export default capsuleChartComponent;
