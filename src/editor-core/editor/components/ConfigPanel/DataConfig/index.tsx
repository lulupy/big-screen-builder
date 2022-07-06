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