import React from 'react';
import { IItem } from '../../editor/item';

interface IItemWrapperProps {
  item: IItem
}

const ItemWrapper = ({ item }: IItemWrapperProps) => {
  return <div>ItemWrapper</div>
}

export default React.memo(ItemWrapper);