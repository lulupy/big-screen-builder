import React from 'react';
import { IItem } from '../../editor-core/item';
import ItemEventBus from '../ItemEventBus';

interface IItemWrapperProps {
  item: IItem,
}

const ItemWrapper = ({ item }: IItemWrapperProps) => {
  const { ViewComponent } = item.component;
  const { id } = item;
  const { size, position, rotate } = item.getShape();
  const eventConfig = item.getEventConfigValue();
  const eventBus = new ItemEventBus(id, eventConfig);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        boxSizing: 'border-box',
        width: size.width,
        height: size.height,
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotate}deg)`,
      }}
    >
      <ViewComponent eventBus={eventBus}></ViewComponent>
    </div>
  );
}

export default React.memo(ItemWrapper);