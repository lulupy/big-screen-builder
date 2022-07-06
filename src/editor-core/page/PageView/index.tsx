import React from 'react';
import ItemView from '../components/ItemView';
import { IPage } from '../IPage';
import './index.css';

interface IPageViewProps {
  page: IPage,
}

const PageView = ({ page }:IPageViewProps) => {
  const { width, height } = page.size;
  // 因为当items改变时, 需要更改页面, 所以使用useState
  const [items, setItems] = React.useState(page.getItems());
  const [current, setCurrent] = React.useState(page.getCurrentItem());

  React.useEffect(() => {
    page.on('itemsChange', (items) => {
      // 注意: 不要写成`setItems(items)`, 这样不会触发更新.
      // 因为items为page.items的引用, 需要生成新对象
      setItems([...items]);
    });
  }, [page]);

  React.useEffect(() => {
    page.on('currentItemChange', (item) => {
      // 注意: 不要写成`setItems(items)`, 这样不会触发更新.
      // 因为items为page.items的引用, 需要生成新对象
      setCurrent(item);
    });
  }, [page]);

  const handlePageClick = React.useCallback(() => {
    page.setCurrentItem(null);
  }, [page]);
  return (
    <div style={{width, height}} className="page" onClick={handlePageClick}>
      {items.map(item => (
        <ItemView item={item} key={item.id} isActive={item === current}/>
      ))}
    </div>
  );
};

export default React.memo(PageView);