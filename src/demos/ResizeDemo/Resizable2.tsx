import React from 'react';
import rotatePoint from './utils/rotatePoint';
import createGetRotatePoint from './utils/createGetRotatePoint';
import './Resizable.css';
import Vector2 from './utils/math2d/Vector2';

type Direction = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';


interface Position {
  x: number,
  y: number,
}

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



const rotate = 30;




const Resizable = (props: ResizableProps) => {
  const { onResizeStart, onResize, onResizeStop } = props;
  const [sizeState, setSizeState] = React.useState<Size>(props.size || defaultSize);
  const [position, setPosition] = React.useState({ x: 100, y: 100 })
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
    // const start = {
    //   x: event.clientX,
    //   y: event.clientY,
    // }
    
    const originSize = props.size || sizeState;
    const getRotatePoint =  createGetRotatePoint(originSize, position, rotate);
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
      let newRotatedTopLeft = { ...rotatedTopLeft};
      let newRotatedBottomRight = {...rotatedBottomRight};
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

      if(newSize.width > 20 && newSize.height > 20) {
        setSizeState(newSize);
        setPosition(newTopLeftPoint);
      }


    }

    function mouseUp (event: MouseEvent) {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    }

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

  }, [props.size, sizeState]);
  const size = isResizing ? sizeState : (props.size || sizeState);


  const handleTopLeftMouseDown = (event: React.MouseEvent) => {
    const originSize = props.size || sizeState;
    // 中心点, 因为是按中心点旋转, 所以旋转前旋转后中心点都是一样的
    const centerPoint = {
      x: position.x + originSize.width / 2,
      y: position.y + originSize.height /2,
    };
    const target: HTMLElement = event.target as HTMLElement;
    const parentRect = {
      left: 0,
      top: 0
    };
    const rect = target.getBoundingClientRect();

    // topleft control中心点
    const startPoint = {
      x: Math.round(rect.left - parentRect.left + target.offsetWidth / 2),
      y: Math.round(rect.top - parentRect.top + target.offsetHeight / 2),
    };

    
    // startPoint关于centerPoint的对称点, 这里也就是rightBottom
    const symmetricPoint = {
      x: centerPoint.x - (startPoint.x - centerPoint.x),
      y: centerPoint.y - (startPoint.y - centerPoint.y),
    };
    const mouseMove = (event: MouseEvent) => {
      // 鼠标的位置就是topLeft顶点的位置
      const mousePoint = {
        x: event.clientX - parentRect.left,
        y: event.clientY - parentRect.top,
      };


      const newCenterPoint = {
        x: (symmetricPoint.x + mousePoint.x)/2,
        y: (symmetricPoint.y + mousePoint.y)/2,
      };

      const  newTopLeftPoint = rotatePoint(mousePoint, newCenterPoint, -rotate);
      const  newBottomRightPoint = rotatePoint(symmetricPoint, newCenterPoint, -rotate);


      const newSize = {
        width: newBottomRightPoint.x - newTopLeftPoint.x,
        height: newBottomRightPoint.y - newTopLeftPoint.y,
      };

      setSizeState(newSize);
      setPosition(newTopLeftPoint);
    }
    function mouseUp (event: MouseEvent) {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    }

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);


  };

  const handleRightMouseDown = (event: React.MouseEvent) => {

  
    // size position
    const originSize = props.size || sizeState;
    const getRotatePoint =  createGetRotatePoint(originSize, position, rotate);
    const rotatedRight = getRotatePoint('right');
    const rotatedTopLeft = getRotatePoint('topLeft');
    const rotatedBottomRight = getRotatePoint('bottomRight');
    const center = getRotatePoint('center');

    // 向量
    const vec = new Vector2(
      rotatedRight.x - center.x,
      rotatedRight.y - center.y,
    );
    vec.normalize();
    const mouseMove = (event: MouseEvent) => {
      // 鼠标的位置
      const newRotateRight = {
        x: event.clientX,
        y: event.clientY,
      };

      const vec2 = new Vector2(
        newRotateRight.x - rotatedRight.x,
        newRotateRight.y - rotatedRight.y,
      );


      const projection = vec.dot(vec2);
      const vec3 = vec.clone().scale(projection);
      const vec4 = new Vector2(
        rotatedBottomRight.x,
        rotatedBottomRight.y
      );

      const newRotatedBottomRight = vec4.add(vec3);


      const newCenterPoint = {
        x: (newRotatedBottomRight.x + rotatedTopLeft.x)/2,
        y: (newRotatedBottomRight.y + rotatedTopLeft.y)/2,
      };

      const  newTopLeftPoint = rotatePoint(rotatedTopLeft, newCenterPoint, -rotate);
      const  newBottomRightPoint = rotatePoint(newRotatedBottomRight, newCenterPoint, -rotate);

      const newSize = {
        width: newBottomRightPoint.x - newTopLeftPoint.x,
        height: newBottomRightPoint.y - newTopLeftPoint.y,
      };

      setSizeState(newSize);
      setPosition(newTopLeftPoint);
    }
    
    function mouseUp (event: MouseEvent) {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    }

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  }

  return (

    <div
      className='resize-wrapper'
      style={{
        ...props.style,
        ...size,
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotate}deg)`
      }}
    >
      {props.children}
      <div onMouseDown={handleMouseDown.bind(null, 'top')} className='control top'></div>
      <div onMouseDown={handleRightMouseDown} className='control right'></div>
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
