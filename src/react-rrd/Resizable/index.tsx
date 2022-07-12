import React from 'react';
import rotatePoint from './utils/rotatePoint';
import createGetRotatePoint from './utils/createGetRotatePoint';
import Vector2 from './utils/math2d/Vector2';
import type { Direction, Size, Position } from './inteface';
import './index.css';


export type ResizeStartCallback = (event: React.MouseEvent, dir: Direction) => void;
export type ResizeCallback = (event: MouseEvent, direction: Direction, size: Size, position: Position) => void;

interface ResizableProps {
  enable?: boolean,
  style?: React.CSSProperties;
  className?: string;
  size: Size;
  position: Position,
  rotate: number,
  onResizeStart?: ResizeStartCallback;
  onResize?: ResizeCallback;
  onResizeStop?: ResizeCallback;
  children: React.ReactNode,
}
function hasDirection(dir: 'top' | 'right' | 'bottom' | 'left', target: Direction) {
  return new RegExp(dir, 'i').test(target);
}


const Resizable = React.forwardRef<HTMLDivElement, ResizableProps>((props: ResizableProps, ref) => {
  const { onResizeStart, onResize, onResizeStop, size, position, rotate, style, enable = true, ...other } = props;
  // 记录最后一次mousemove后位置信息
  const lastSizeAndPosition = React.useRef<{size: Size, position: Position} | null>(null);
  const handleMouseDown = React.useCallback((direction: Direction, event: React.MouseEvent) => {

    event.stopPropagation();
    event.preventDefault();
    onResizeStart && onResizeStart(event, direction);

    const getRotatePoint =  createGetRotatePoint(size, position, rotate);
    const rotatedTopLeft = getRotatePoint('topLeft');
    const rotatedBottomRight = getRotatePoint('bottomRight');
    const center = getRotatePoint('center');

    // 获取在某一方向上代表鼠标位移的向量
    function getMoveVecAtDir(mousePosition: Position, direction: Direction, moveDirction: 'left' | 'right' | 'top' | 'bottom') {
      const point = getRotatePoint(moveDirction);
      // 上下左右方向
      const dirctionVec = new Vector2(
        point.x - center.x,
        point.y - center.y,
      );
      dirctionVec.normalize();
      const target = getRotatePoint(direction);

      const moveVec = new Vector2(
        mousePosition.x - target.x,
        mousePosition.y - target.y,
      );
      const moveVecAtDir = dirctionVec.clone().scale(dirctionVec.dot(moveVec));
      return moveVecAtDir;
    }

    function movePoint(point: Position, moveVec: Vector2) {
      const vec =  new Vector2(point.x, point.y);
      return vec.add(moveVec).toPositon();
    }

    function mouseMove (event: MouseEvent) {
      event.stopPropagation();
      event.preventDefault();
      let newRotatedTopLeft = { ...rotatedTopLeft};
      let newRotatedBottomRight = {...rotatedBottomRight};

      // 这里只考虑了PC端的情况, 如果需要考虑移动端的话, 那么对应的事件为React.TouchEvent
      // 并且需要对取clientX做兼容, 对于TouchEvent： event: touches[0].clientX
      // 可以参考代码: https://github.com/bokuweb/re-resizable/blob/master/src/index.tsx#L677-L689

      // 这里鼠标位置是相对于视口的, 如果box是希望参照某个容器来定位, 需要计算偏移量
      const mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };

      if(hasDirection('bottom', direction)) {
        const moveVecAtDir = getMoveVecAtDir(mousePosition, direction, 'bottom');
        newRotatedBottomRight = movePoint(newRotatedBottomRight, moveVecAtDir);
      }
      if(hasDirection('top', direction)) {
        const moveVecAtDir = getMoveVecAtDir(mousePosition, direction, 'top');
        newRotatedTopLeft = movePoint(newRotatedTopLeft, moveVecAtDir);
      }
      if(hasDirection('right', direction)) {
        const moveVecAtDir = getMoveVecAtDir(mousePosition, direction, 'right');
        newRotatedBottomRight = movePoint(newRotatedBottomRight, moveVecAtDir);
      }
      if(hasDirection('left', direction)) {
        const moveVecAtDir = getMoveVecAtDir(mousePosition, direction, 'left');
        newRotatedTopLeft = movePoint(newRotatedTopLeft, moveVecAtDir);
      }

      const newCenterPoint = {
        x: (newRotatedBottomRight.x + newRotatedTopLeft.x)/2,
        y: (newRotatedBottomRight.y + newRotatedTopLeft.y)/2,
      };

      const  newTopLeftPoint = rotatePoint(newRotatedTopLeft, newCenterPoint, -rotate);
      const  newBottomRightPoint = rotatePoint(newRotatedBottomRight, newCenterPoint, -rotate);

      const newSize = {
        width: newBottomRightPoint.x - newTopLeftPoint.x,
        height: newBottomRightPoint.y - newTopLeftPoint.y,
      };

      const newPosition = newTopLeftPoint;
      if(newSize.width > 20 && newSize.height > 20) {
        onResize && onResize(event, direction, newSize, newPosition);
        lastSizeAndPosition.current = {
          size: newSize,
          position: newPosition,
        };
      }
    }

    function mouseUp (event: MouseEvent) {
      event.stopPropagation();
      event.preventDefault();
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
      if(!lastSizeAndPosition.current) return;
      const {size, position} = lastSizeAndPosition.current;
      onResizeStop && onResizeStop(event, direction, size, position);
    }

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

  }, [size, position, rotate, onResize, onResizeStop, onResizeStart]);

  return (

    <div
      {...other}
      ref={ref}
      className='resize-wrapper'
      style={{
        ...style,
        ...size,
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotate}deg)`
      }}
    >
      {props.children}
      {enable && (
        <>
          <div onMouseDown={handleMouseDown.bind(null, 'top')} className='control top'></div>
          <div onMouseDown={handleMouseDown.bind(null, 'right')} className='control right'></div>
          <div onMouseDown={handleMouseDown.bind(null, 'bottom')} className='control bottom'></div>
          <div onMouseDown={handleMouseDown.bind(null, 'left')} className='control left'></div>
          <div onMouseDown={handleMouseDown.bind(null, 'topRight')} className='control topRight'></div>
          <div onMouseDown={handleMouseDown.bind(null, 'bottomRight')} className='control bottomRight'></div>
          <div onMouseDown={handleMouseDown.bind(null, 'bottomLeft')} className='control bottomLeft'></div>
          <div onMouseDown={handleMouseDown.bind(null, 'topLeft')} className='control topLeft'></div>
        </>
      )}
        
    </div>
  );
})


export default Resizable;