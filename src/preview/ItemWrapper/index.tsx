import { Emitter } from 'mitt';
import React from 'react';
import { IItem } from '../../editor-core/item';
import ItemEventBus from '../ItemEventBus';

interface IItemWrapperProps {
  item: IItem,
}

const ItemWrapper = ({ item }: IItemWrapperProps) => {
  const { ViewComponent } = item.component;
  const { id } = item;
  const eventConfig = item.getEventConfigValue();
  const eventBus = new ItemEventBus(id, eventConfig);

  return (
    <div>
      <ViewComponent eventBus={eventBus}></ViewComponent>
    </div>
  );
}

export default React.memo(ItemWrapper);