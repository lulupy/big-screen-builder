import React from 'react';
import { ComponentModel } from "../../editor-core";
import { ActiveRingChart } from "@jiaminghi/data-view-react";
import DataVWrapper from "./datav-support/DataVWrapper";
import { IComponentProps } from "../../editor-core/interface";

const Component = ({ properties, dataSource, shape }: IComponentProps) => {
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
    <DataVWrapper>
      <ActiveRingChart
        style={{
          height: shape.size.height,
          width: shape.size.width,
        }}
        config={{ data }}>
        
      </ActiveRingChart>
    </DataVWrapper>
  );
}


const activeRingChartComponent = new ComponentModel({
  name: 'activeRingChart',
  label: '动态环图',
  icon: '',
  properties: [],
  defaultSize: { width: 200, height: 200 },
  dataFields: [],
  actions: [],
  events: [],
  Component: Component,
  ViewComponent: Component,
});


export default activeRingChartComponent;
