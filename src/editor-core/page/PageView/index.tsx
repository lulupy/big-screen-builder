import React from 'react';
import { useDrop } from 'react-dnd';
import { IComponent } from '../../component';
import { COMPONENT_TYPE } from '../../constants';
import ItemView from '../components/ItemView';
import MarkLine from '../components/MarkLine';
import { IPage, IPageConfig } from '../IPage';
import backgroundImage from '../../../default/bg.png';
import './index.css';

interface IPageViewProps {
  page: IPage,
}


const PageView = ({ page }:IPageViewProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [{size, backgroundColor}, setConfig] = React.useState<Omit<IPageConfig, 'scaleMode'>>(page.getConfig());
  const [{ isOver }, drop] = useDrop(() => ({
    accept: COMPONENT_TYPE,
    // drop回调函数
    drop: (item: { component: IComponent }, monitor) => {
      const { defaultSize } = item.component;
      // monitor.getClientOffset: 返回鼠标的位置, 相对于视口
      const offset = monitor.getClientOffset();
      if(!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      item.component.addToPage(
        defaultSize,
        { x: (offset?.x || 0) - rect.x, y: (offset?.y || 0) - rect.y },
      );
    },
    collect: monitor => {
      return {
        isOver: monitor.isOver(),
      };
    },
  }));

  const opacity = isOver ? 0.7 : 1;
  const { width, height } = size;
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

  React.useEffect(() => {
    console.log(page);
    page.on('configChange', ({ size, backgroundColor }) => {
      console.log('configChange');
      setConfig({
        size,
        backgroundColor,
      })
    });
  }, [page]);

  const handlePageClick = React.useCallback(() => {
    page.setCurrentItem(null);
  }, [page]);

  drop(ref);
  return (
    <div
      ref={ref}
      style={{
        width,
        height,
        opacity,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor,
        backgroundImage: `url(${backgroundImage})`,

      }}
      className="page"
      onClick={handlePageClick}
    >
      {items.map(item => (
        <ItemView page={page} item={item} key={item.id} isActive={item === current}/>
      ))}
      <MarkLine page={page} />
    </div>
  );
};

export default React.memo(PageView);