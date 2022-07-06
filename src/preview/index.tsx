import React from 'react';
import {IPage} from '../editor';
import ItemWrapper from './ItemWrapper';
interface IPreviewProps {
  page: IPage,
};
const Preview = ({ page }: IPreviewProps) => {
  const items = page.getItems();
  return (
    <div>
      {items.map(item => <ItemWrapper item={item} />)}
    </div>
  )
}

export default React.memo(Preview);
