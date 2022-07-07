import React, { CSSProperties, SyntheticEvent } from 'react';
import { IDataSource } from '../../../DataSource/AbstractDataSource';
import StaticDataSource from '../../../DataSource/StaticDataSource';
import { IItem } from '../../../item';
import { IDataConfigValue } from '../../../item/IItem';
import { IShape } from '../../IPage';

interface IItemViewProps {
  item: IItem,
  isActive: boolean,
}
const ItemView = ({ item, isActive } : IItemViewProps) => {
  const [{size, position}, setShape] = React.useState(item.getShape());
  const [dataSource, setDataSoure] = React.useState<IDataSource | null>(null);
  const [properties, setProperties] = React.useState(item.getPropConfigValue());
  const { Component } = item.component;



  React.useEffect(() => {
    const handleShapeChange = (shape: IShape) => {
      setShape(shape);
    }

    const handlePropertiesChange = (properties: { [key: string]: unknown }) => {
      setProperties({...properties})
    };

    const handleDataConfigChange = (dataConfigValue: IDataConfigValue) => {
      const { dataMaps, dataSource, filters } = dataConfigValue;
      // todo: 创建dataSourceInstance对象的方式要修改, 用工厂模式还是其它?
      const dataSourceInstance =  new StaticDataSource({
        filters,
        dataMaps,
        json: dataSource.options.json,
      });
      setDataSoure(dataSourceInstance);
    }

    item.on('shapeChange', handleShapeChange);
    item.on('propertiesChange', handlePropertiesChange);
    item.on('dataConfigChange', handleDataConfigChange);
    return () => {
      item.off('shapeChange', handleShapeChange);
      item.off('propertiesChange', handlePropertiesChange);
      item.off('dataConfigChange', handleDataConfigChange);
    }
  }, [item]);
  const handleSelectItem = React.useCallback((event: SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();
    item.select();
  }, [item]);
  const style: CSSProperties = {
    ...size,
    transform: `translate(${position.x}px, ${position.y}px)`,
    border: isActive ? '1px solid blue' : 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  };
  return (
    <div
      onClick={handleSelectItem}
      style={style}
    >
      {item.id}
      <button onClick={() => {
        item.setPoistion({ x: 0, y: 0 });
        // item.setSize();
        // item.setShape();
      }}>
        changePosition
      </button>
      <pre>{JSON.stringify(position, null ,2)}</pre>
      <Component properties={properties} dataSource={dataSource} />
    </div>
  );
}

export default React.memo(ItemView);