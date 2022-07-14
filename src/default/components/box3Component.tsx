import { ComponentModel } from "../../editor-core";
import { BorderBox3 } from "@jiaminghi/data-view-react";
import DataVWrapper from './datav-support/DataVWrapper';



const Component = ({ properties }: any) => {
  return (
    <DataVWrapper>
      <BorderBox3 backgroundColor={properties.backgroundColor}></BorderBox3>
    </DataVWrapper>
  );
}


const box3Component = new ComponentModel({
  name: 'box3',
  label: 'box3',
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


export default box3Component;
