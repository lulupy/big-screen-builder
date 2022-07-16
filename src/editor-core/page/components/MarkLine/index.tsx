import React from 'react';
import { getRotatedRectBoundary } from './utils/getRectBoundary';
import { getMarkLineShowMap } from './utils/getMarkLineShowMap';
import { getOriginLeft, getOriginTop } from './utils/getOriginTopAndLeft';
import { IPage } from '../../IPage';
import './index.css';
import { IMarkLineShowMap } from './interface';
import getMatchConditions from './utils/getMatchConditions';

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
      const curRotate = item.getShape().rotate;
      const curBoundary = getRotatedRectBoundary({
        position: curPosition,
        size: curSize,
        rotate: curRotate,
      });
      const items = page.getItems().filter(it => it !== item);
      items.forEach(it => {
        const boundary = getRotatedRectBoundary(it.getShape());
        // 吸附: 未完成, 在拖动期间为rrd为非受控, 所以通过item.setXY虽然可以改变rrd的position属性, 但是没有效果, 最终在mouseUp时又会被修改
        // const conditions = getMatchConditions(boundary, curBoundary);
        // conditions.forEach(condition => {
        //   if(!condition.test) return;
        //   if(condition.type.includes('X')) {
        //     item.setY(getOriginTop(item.getShape(), condition.drag));
        //   } else {
        //     item.setX(getOriginLeft(it.getShape(), condition.drag));
        //   }
        // });
        setMarkLineShowMap(getMarkLineShowMap(boundary, curBoundary, isRightward, isDownward));
      });
    });
    page.on('itemMoveStop', (item) => {
      // 隐藏
      setMarkLineShowMap({...defaultMarkLineShowMap});
    })
  }, [page]);
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
