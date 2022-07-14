import { ComponentModel } from "../../editor-core";
import { Decoration1 } from "@jiaminghi/data-view-react";
import DataVWrapper from './datav-support/DataVWrapper';



const Component = ({ properties }: any) => {
  return (
    <DataVWrapper>
      <Decoration1 backgroundColor={properties.backgroundColor}></Decoration1>
    </DataVWrapper>
  );
}


const decoration1Component = new ComponentModel({
  name: 'decoration1',
  label: '装饰1',
  icon: '',
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


export default decoration1Component;
