import React, { SyntheticEvent } from 'react';
import { IItem } from '../../../item';
import { IShape } from '../../IPage';

interface IItemViewProps {
  item: IItem,
  isActive: boolean,
}
const ItemView = ({ item, isActive } : IItemViewProps) => {
  const [{size, position}, setShape] = React.useState(item.getShape());
  const [properties, setProperties] = React.useState(item.getPropConfigValue());
  const { Component } = item.component;



  React.useEffect(() => {
    const handleShapeChange = (shape: IShape) => {
      setShape(shape);
    }

    const handlePropertiesChange = (properties: { [key: string]: unknown }) => {
      setProperties({...properties})
    };

    item.on('shapeChange', handleShapeChange);
    item.on('propertiesChange', handlePropertiesChange);
    return () => {
      item.off('shapeChange', handleShapeChange);
      item.off('propertiesChange', handlePropertiesChange);
    }
  }, [item]);
  const handleSelectItem = React.useCallback((event: SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();
    item.select();
  }, [item]);
  return (
    <div onClick={handleSelectItem} style={{ border: isActive ? '1px solid blue' : 'none' }}>
      {item.id}
      <button onClick={() => {
        item.setPoistion({ x: 0, y: 0 });
        // item.setSize();
        // item.setShape();
      }}>
        changePosition
      </button>
      <pre>{JSON.stringify(position, null ,2)}</pre>
      <Component properties={properties} />
    </div>
  );
}

export default React.memo(ItemView);