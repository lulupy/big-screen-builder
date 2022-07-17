import React, { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENT_TYPE } from '../../constants';
import { IComponent } from '../IComponent';
import './index.css';

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
    <div
      ref={drag}
      className="component-view"
      style={{ ...style }}
    >
      <span>{component.label}</span>
      <div className='component-view__img'>
        <img src={component.icon} alt="" />
      </div>
    </div>

  );
};

export default React.memo(ComponentView);