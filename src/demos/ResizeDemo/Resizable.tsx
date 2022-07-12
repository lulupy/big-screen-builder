import React from 'react';
import { flushSync } from 'react-dom';
import './Resizable.css';

type Direction = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';


interface Size {
  width:  number;
  height:  number;
}

type ResizeStartCallback = (event: React.MouseEvent, dir: Direction) => void;
type ResizeCallback = (event: MouseEvent, direction: Direction, delta: Size, size: Size) => void;

interface ResizableProps {
  style?: React.CSSProperties;
  className?: string;
  size?: Size;
  scale?: number;
  onResizeStart?: ResizeStartCallback;
  onResize?: ResizeCallback;
  onResizeStop?: ResizeCallback;
  children: React.ReactNode,
}
function hasDirection(dir: 'top' | 'right' | 'bottom' | 'left', target: Direction) {
  return new RegExp(dir, 'i').test(target);
}

const defaultSize = { width: 100, height: 100 };





const Resizable = (props: ResizableProps) => {
  const { onResizeStart, onResize, onResizeStop } = props;
  const [sizeState, setSizeState] = React.useState<Size>(props.size || defaultSize);
  const sizeRef = React.useRef(sizeState);
  const deltaRef = React.useRef({ width: 0, height: 0 });
  const [isResizing, setIsResizing] = React.useState(false);


  function setSize (size: Size) {
    setSizeState(size);
    sizeRef.current = size;
  }


  const handleMouseDown = React.useCallback((direction: Direction, event: React.MouseEvent) => {
    // 这里只考虑了PC端的情况, 如果需要考虑移动端的话, 那么对应的事件为React.TouchEvent
    // 并且需要对取clientX做兼容, 对于TouchEvent： event: touches[0].clientX
    // 可以参考代码: https://github.com/bokuweb/re-resizable/blob/master/src/index.tsx#L677-L689
    const start = {
      x: event.clientX,
      y: event.clientY,
    }
    

    const originSize = props.size || sizeState;

    onResizeStart && onResizeStart(event, direction);
    const mouseMove = (event: MouseEvent) => {

      setIsResizing(true);
      const delta = {
        width: 0,
        height: 0,
      };

      if(hasDirection('bottom', direction)) {
        delta.height = (event.y - start.y);
      }
      if(hasDirection('top', direction)) {
        delta.height = -(event.y - start.y);
      }
      if(hasDirection('right', direction)) {
        delta.width = (event.x - start.x);
      }
      if(hasDirection('left', direction)) {
        delta.width = -(event.x - start.x);
      }
      const newSize = {
        width: originSize.width + delta.width,
        height: originSize.height + delta.height,
      };
      // For v18, update state sync
      // 因为后续mouseUp事件中需要获取newSize
      flushSync(() => {
        setSize(newSize);
      });
      deltaRef.current = delta;
      onResize && onResize(event, direction, delta, newSize);
    }

    function mouseUp (event: MouseEvent) {
      setIsResizing(false);
      onResizeStop && onResizeStop(event, direction, deltaRef.current, sizeRef.current);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    }

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

  }, [props.size, sizeState]);
  const size = isResizing ? sizeState : (props.size || sizeState);
  return (

    <div className='resize-wrapper' style={{ ...props.style, ...size}}>
      {props.children}
      <div onMouseDown={handleMouseDown.bind(null, 'top')} className='control top'></div>
      <div onMouseDown={handleMouseDown.bind(null, 'right')} className='control right'></div>
      <div onMouseDown={handleMouseDown.bind(null, 'bottom')} className='control bottom'></div>
      <div onMouseDown={handleMouseDown.bind(null, 'left')} className='control left'></div>
      <div onMouseDown={handleMouseDown.bind(null, 'topRight')} className='control topRight'></div>
      <div onMouseDown={handleMouseDown.bind(null, 'bottomRight')} className='control bottomRight'></div>
      <div onMouseDown={handleMouseDown.bind(null, 'bottomLeft')} className='control bottomLeft'></div>
      <div onMouseDown={handleMouseDown.bind(null, 'topLeft')} className='control topLeft'></div>
    </div>
  );
}

export default Resizable;
