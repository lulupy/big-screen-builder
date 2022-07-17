import { ComponentModel } from "../../editor-core";
import { Decoration2 } from "@jiaminghi/data-view-react";
import DataVWrapper from './datav-support/DataVWrapper';
import { IComponentProps } from "../../editor-core/interface";



const Component = ({ properties, shape }: IComponentProps) => {
  return (
    <DataVWrapper>
      <Decoration2
        backgroundColor={properties.backgroundColor}
        style={{
          height: shape.size.height,
          width: shape.size.width,
        }}
      >
      </Decoration2>
    </DataVWrapper>
  );
}


const decoration2Component = new ComponentModel({
  name: 'decoration2',
  label: '装饰2',
  icon: '',
  properties: [
    { name: 'backgroundColor', label: '背景色	',  type: 'input' },
  ],
  defaultSize: { width: 100, height: 20 },
  dataFields: [],
  actions: [],
  events: [],
  Component: Component,
  ViewComponent: Component,
});


export default decoration2Component;
