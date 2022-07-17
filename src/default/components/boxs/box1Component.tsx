import { ComponentModel } from "../../../editor-core";
import { BorderBox1 } from "@jiaminghi/data-view-react";
import DataVWrapper from "../datav-support/DataVWrapper";


const Component = ({ properties }: any) => {
  return (
    <DataVWrapper>
      <BorderBox1 backgroundColor={properties.backgroundColor}></BorderBox1>
    </DataVWrapper>
  );
}


const box1Component = new ComponentModel({
  name: 'box1',
  label: 'box1',
  icon: require('../../icons/box1-white.png'),
  properties: [
    { name: 'backgroundColor', label: '背景色	',  type: 'input' },
  ],
  defaultSize: { width: 200, height: 200 },
  dataFields: [],
  actions: [],
  events: [],
  Component: Component,
  ViewComponent: Component,
});


export default box1Component;
