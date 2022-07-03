import React from 'react';
import { IPage } from '../../../page';
import ItemConfig from './ItemConfig';
import PageConfig from './PageConfig';

interface IConfigPanelProps  {
  page: IPage,
};
const ConfigPanel = ({ page }: IConfigPanelProps) => {
  const [current, setCurrent] = React.useState(page.getCurrentItem());
  React.useEffect(() => {
    page.on('currentItemChange', (cur) => {
      setCurrent(cur);
    });
  }, [page]);
  return current ? <ItemConfig item={current} /> : <PageConfig />;
}

export default React.memo(ConfigPanel);