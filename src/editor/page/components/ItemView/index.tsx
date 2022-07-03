import React, { SyntheticEvent } from 'react';
import { IItem } from '../../../item';

interface IItemViewProps {
  item: IItem,
  isActive: boolean,
}
const ItemView = ({ item, isActive } : IItemViewProps) => {
  const [{size, position}, setShape] = React.useState(item.getShape());
  React.useEffect(() => {
    item.on('shapeChange', (shape) => {
      setShape(shape);
    });
  });
  const handleSelectItem = React.useCallback((event: SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();
    item.select();
  }, [item]);
  return (
    <div onClick={handleSelectItem} style={{ border: isActive ? '1px solid blue' : 'none' }}>
      <button onClick={() => {
        item.setPoistion({ x: 0, y: 0 });
        // item.setSize();
        // item.setShape();
      }}>
        changePosition
      </button>
      ItemView
      <pre>{JSON.stringify(position, null ,2)}</pre>
    </div>
  );
}

export default React.memo(ItemView);