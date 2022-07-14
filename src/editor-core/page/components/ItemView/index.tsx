import React, { SyntheticEvent } from 'react';
import Rrd from '../../../../react-rrd';
import { IDataSource } from '../../../DataSource/AbstractDataSource';
import StaticDataSource from '../../../DataSource/StaticDataSource';
import { IItem } from '../../../item';
import { IDataConfigValue } from '../../../item/IItem';
import { IPage, IShape } from '../../IPage';


interface IItemViewProps {
  item: IItem,
  page: IPage,
  isActive: boolean,
}
const ItemView = ({ item, page, isActive } : IItemViewProps) => {
  const [{size, position, rotate}, setShape] = React.useState(item.getShape());
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

  return (
    <Rrd
      style={{ 
        border: '1px solid #ccc',
        borderColor: isActive ? '#59c7f9' : '#ccc',
        position: 'absolute',
        top: 0,
        left: 0,
        boxSizing: 'border-box',
      }}
      onClick={handleSelectItem}
      size={size}
      position={position}
      rotate={rotate}
      enableResizing={isActive}
      enableRotate={isActive}
      onDragStop={(e, d) => {
        e.preventDefault();
        e.stopPropagation();
        item.setPoistion({
          x: d.x,
          y: d.y,
        });
        page.emit('itemMoveStop', item);
      }}
      onDrag={(e, data) => {
        page.emit('itemMove', { item, data });
      }}
      onResizeStop={(e, direction, size, position) => {
        e.preventDefault();
        e.stopPropagation();
        // 注意: 改变size的时候, position也有可能被改变, 比如向上改变大小时
        item.setShape({
          size,
          position,
        });
      }}
      onRotateStop={(rotate) => {
        item.setRotate(rotate);
      }}
    >
      <div
        style={{
          overflow: 'hidden',
          height: '100%',
          width: '100%',
        }}
      >
        {item.id}
        <button onClick={() => {
          item.setPoistion({ x: 0, y: 0 });
          // item.setSize();
          // item.setShape();
        }}>
          changePosition
        </button>
        <Component properties={properties} dataSource={dataSource} />
      </div>

    </Rrd>
  );
}

export default React.memo(ItemView);