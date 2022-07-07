import React, { SyntheticEvent } from 'react';
import { Rnd } from 'react-rnd';
import { IDataSource } from '../../../DataSource/AbstractDataSource';
import StaticDataSource from '../../../DataSource/StaticDataSource';
import { IItem } from '../../../item';
import { IDataConfigValue } from '../../../item/IItem';
import { IShape } from '../../IPage';
import ResizeHandle from './ResizeHandle';

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


  return (
    <Rnd
      style={{ 
        border: isActive ? '1px solid #59c7f9' : 'none',
      }}
      onClick={handleSelectItem}
      size={size}
      position={position}
      enableResizing={isActive}
      onDragStop={(e, d) => {
        e.preventDefault();
        e.stopPropagation();
        item.setPoistion(d);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        e.preventDefault();
        e.stopPropagation();
        // 注意: 改变size的时候, position也有可能被改变, 比如向上改变大小时
        item.setShape({
          size: {
            width: size.width + delta.width,
            height: size.height + delta.height,
          },
          position,
        })
      }}
      resizeHandleComponent={{
        top: <ResizeHandle />,
        right: <ResizeHandle />,
        bottom: <ResizeHandle />,
        left: <ResizeHandle />,
        topRight: <ResizeHandle />,
        bottomRight: <ResizeHandle />,
        bottomLeft: <ResizeHandle />,
        topLeft: <ResizeHandle />,
      }}
    >
      <div>
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

    </Rnd>
  );
}

export default React.memo(ItemView);