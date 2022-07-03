import React from 'react';
import { Tabs } from 'antd';
import BaseConfig from '../BaseConfig';
import { IItem } from '../../../../item';
import DataConfig from '../DataConfig';
import './index.css';

const { TabPane } = Tabs;

interface IItemConfigProps {
  item: IItem,
};

const ItemConfig = ({ item }: IItemConfigProps) => {
  const { properties, events, dataFields } = item.component;

  return (
    <div className='item-config'>
      <Tabs>
        <TabPane tab="配置" key="1">
          <BaseConfig item={item} properties={properties} />
        </TabPane>
        <TabPane tab="数据" key="2">
          <DataConfig />
        </TabPane>
        <TabPane tab="交互" key="3">
          交互
        </TabPane>
      </Tabs>
    </div>
  );
}

export default React.memo(ItemConfig);