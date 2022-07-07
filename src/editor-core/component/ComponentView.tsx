import React, { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENT_TYPE } from '../constants';
import { IComponent } from './IComponent';

interface IComponentViewProps {
  component: IComponent,
}
const ComponentView = ({ component }: IComponentViewProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: COMPONENT_TYPE,
    item: {
      component,
    },
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  }));

  const style: CSSProperties = React.useMemo(
    () => ({
      opacity: isDragging ? 0.4 : 1,
      cursor: 'move',
    }),
    [isDragging],
  );


  return (
    <>
      <div ref={drag} style={{ ...style, border: '1px solid #111' }}>
        <img src="" alt="" />
        <span>{component.label}</span>
      </div>
    </>
  );
};

export default React.memo(ComponentView);