import { ComponentModel } from "../../../editor-core";
import { Decoration1 } from "@jiaminghi/data-view-react";
import DataVWrapper from '../datav-support/DataVWrapper';
import { IComponentProps } from "../../../editor-core/interface";



const Component = ({ properties, shape }: IComponentProps) => {
  return (
    <DataVWrapper>
      <Decoration1
        backgroundColor={properties.backgroundColor}
        style={{
          height: shape.size.height,
          width: shape.size.width,
        }}
      >
      </Decoration1>
    </DataVWrapper>
  );
}


const decoration1Component = new ComponentModel({
  name: 'decoration1',
  label: '装饰1',
  icon: require('../../icons/decoration1-white.png'),
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
