import React from 'react';
import './index.css';

interface Position {
  x: number;
  y: number;
}

export type RotateStartCallack = (startRotate: number) => void;
export type RotateCallack = (roate: number) => void;


// 计算旋转的角度
function calculateRotateDelta(start: Position, center: Position, current: Position) {
  const before  = Math.atan2(start.y - center.y, start.x - center.x);
  const after = Math.atan2(current.y - center.y, current.x - center.x);
  const roate = after - before;
  return roate / (Math.PI / 180);
}

interface RotateControlProps {
  enable?: boolean,
  box: React.RefObject<HTMLDivElement>,
  rotate: number,
  onRotateStart?: RotateStartCallack,
  onRotate?: RotateCallack,
  onRotateStop?: RotateCallack,
}
const RotateControl = ({ box, rotate, enable = true, onRotateStart, onRotate, onRotateStop }: RotateControlProps) => {
  const lastRotate = React.useRef<number | null>(null);
  const handleRotateMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault(); //  防止文字选中
    // 计算鼠标按下时的位置

    onRotateStart && onRotateStart(rotate);
    const start = {
      x: event.clientX,
      y: event.clientY
    };


    if(!box.current) return;
    // 计算box中心点位置
    const rect = box.current.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }

    function handleMouseMove(event: MouseEvent) {
      const currentPostion = {
        x: event.clientX,
        y: event.clientY,
      }
      const delta = calculateRotateDelta(
        start,
        center,
        currentPostion
      );
      onRotate && onRotate(rotate + delta);
      lastRotate.current = rotate + delta;
    }

    function handleMouseUp () {
      if(lastRotate.current) {
        onRotateStop && onRotateStop(lastRotate.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  
  return enable ? (
    <div className='rotate-control' onMouseDown={handleRotateMouseDown}></div>
  ) : null;
}

export default RotateControl;