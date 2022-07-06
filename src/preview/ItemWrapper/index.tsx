import React from 'react';
import { IItem } from '../../editor-core/item';

interface IItemWrapperProps {
  item: IItem
}

const ItemWrapper = ({ item }: IItemWrapperProps) => {
  const { ViewComponent } = item.component;
  return (
    <div>
      <ViewComponent></ViewComponent>
    </div>
  );
}

export default React.memo(ItemWrapper);