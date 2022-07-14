import React from 'react';
import { IItem } from '../../../../item';
import DataMapConfig from './components/DataMapConfig';
import StaticDataSourceConfig from './components/StaticDataSourceConfig';
import FilterConfig from './components/FilterConfig';
import ViewDataResult from './components/ViewDataResult';
import './index.css';

interface IDataConfigProps {
  item: IItem,
}

const DataConfig = ({ item }: IDataConfigProps) => {
  const { dataFields } = item.component;
  if(!dataFields || dataFields.length === 0) {
    return <div>无需配置</div>;
  }
  return (
    <div>
      <StaticDataSourceConfig item={item} />
      <FilterConfig item={item} />
      <DataMapConfig item={item} />
      <ViewDataResult item={item} />
    </div>
  );
}

export default React.memo(DataConfig);