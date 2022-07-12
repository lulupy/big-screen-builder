import React from 'react';
import getRectBoundary from './utils/getRectBoundary';
import { getMarkLineShowMap } from './utils/getMarkLineShowMap';
import { IPage } from '../../IPage';
import './index.css';
import { IMarkLineShowMap } from './interface';

interface IMakeLineProps {
  page: IPage,
}





const defaultMarkLineShowMap: IMarkLineShowMap = {
  topX: null,
  centerX: null,
  bottomX: null,
  leftY: null,
  centerY: null,
  rightY: null,
};

const MarkLine = ({ page }: IMakeLineProps) => {

  const [markLineShowMap, setMarkLineShowMap] = React.useState(defaultMarkLineShowMap);
  React.useEffect(() => {
    page.on('itemMove', ({ item, data }) => {
      const isRightward = (data.x - data.lastX) > 0;
      const isDownward = (data.y - data.lastY) > 0;
      const curPosition = { x: data.x, y: data.y };
      const curSize = item.getShape().size;
      const curBoundary = getRectBoundary({ position: curPosition, size: curSize });
      const items = page.getItems().filter(it => it !== item);
      items.forEach(it => {
        const boundary = getRectBoundary(it.getShape());
        setMarkLineShowMap(getMarkLineShowMap(boundary, curBoundary, isRightward, isDownward));
      });
    });
  }, []);
  return (
    <div className='mark-line'>
      {markLineShowMap.topX != null && <div className='line x-line' style={{top: markLineShowMap.topX}}></div>}
      {markLineShowMap.centerX != null && <div className='line x-line' style={{top: markLineShowMap.centerX}}></div>}
      {markLineShowMap.bottomX != null && <div className='line x-line' style={{top: markLineShowMap.bottomX}}></div>}
      {markLineShowMap.leftY != null && <div className='line y-line' style={{left: markLineShowMap.leftY}}></div>}
      {markLineShowMap.centerY != null && <div className='line y-line' style={{left: markLineShowMap.centerY}}></div>}
      {markLineShowMap.rightY != null && <div className='line y-line' style={{left: markLineShowMap.rightY}}></div>}
    </div>
  );
}
export default MarkLine;
