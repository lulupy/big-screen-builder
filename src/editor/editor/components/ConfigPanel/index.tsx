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
  // 这里为ItemConfig加key, 当item切换时, 会重新渲染<ItemConfig />, 而不是更新
  // 这样做的好处是不用手动处理子组件的内部state更新
  return current ? <ItemConfig item={current} key={current.id} /> : <PageConfig />;
}

export default React.memo(ConfigPanel);