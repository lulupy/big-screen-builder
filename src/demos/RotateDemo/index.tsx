import React from 'react';
import './index.css';

interface IPosition  {
  x: number,
  y: number,
}

// 计算旋转的角度
function calculateRotateDelta(start: IPosition, center: IPosition, current: IPosition) {
  const before  = Math.atan2(start.y - center.y, start.x - center.x);
  const after = Math.atan2(current.y - center.y, current.x - center.x);
  const roate = after - before;
  return roate / (Math.PI / 180);
}

const RotateDemo = () => {
  const box = React.useRef<HTMLDivElement>(null);
  const startPositon = React.useRef<IPosition>({ x: 0, y: 0});
  const centerPositon = React.useRef<IPosition>({ x: 0, y: 0});
  const [rotate, setRotate] = React.useState(0);

  const handleMouseDown = (event: React.MouseEvent) => {
    // 计算鼠标按下时的位置
    startPositon.current.x = event.clientX;
    startPositon.current.y = event.clientY;

    if(!box.current) return;
    // 计算box中心点位置
    const rect = box.current.getBoundingClientRect();
    centerPositon.current.x = rect.left + rect.width / 2;
    centerPositon.current.y = rect.top + rect.height / 2;

    function handleMouseMove(event: MouseEvent) {
      const currentPostion = {
        x: event.clientX,
        y: event.clientY,
      }
      const delta = calculateRotateDelta(
        startPositon.current,
        centerPositon.current,
        currentPostion
      );
      setRotate(rotate + delta);
    }

    function handleMouseUp () {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

  };
  

  return (
    <div className="rotate-demo">
      <div
        className="box"
        ref={box}
        style={{ transform: `rotate(${rotate}deg)` }}
        onMouseDown={handleMouseDown}
      >
        <div className='rotate-controle'></div>
      </div>
    </div>
  );
}

export default RotateDemo;