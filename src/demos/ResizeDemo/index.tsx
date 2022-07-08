import React from 'react';
import './index.css';

type Direction = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';

function hasDirection(dir: 'top' | 'right' | 'bottom' | 'left', target: Direction) {
  return new RegExp(dir, 'i').test(target);
}

const ResizeDemo = () => {
  const [size, setSize] = React.useState({ width: 100, height: 100 });
  const handleMouseDown = (direction: Direction, event: React.MouseEvent) => {
    const start = {
      x: event.clientX,
      y: event.clientY,
    }

    const mouseMove = (event: MouseEvent) => {
      const delta = {
        width: 0,
        height: 0,
      };

      if(hasDirection('bottom', direction)) {
        delta.height = event.y - start.y;
      }
      if(hasDirection('top', direction)) {
        delta.height = -(event.y - start.y);
      }
      if(hasDirection('right', direction)) {
        delta.width = event.x - start.x;
      }
      if(hasDirection('left', direction)) {
        delta.width = -(event.x - start.x);
      }

      setSize({
        width: size.width + delta.width,
        height: size.height + delta.height,
      })

    }

    function mouseUp () {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    }

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

  };
  return (
    <div className='resize-demo'>
      <div className='box' style={{ ...size}}>
        <div onMouseDown={handleMouseDown.bind(null, 'top')} className='control top'></div>
        <div onMouseDown={handleMouseDown.bind(null, 'right')} className='control right'></div>
        <div onMouseDown={handleMouseDown.bind(null, 'bottom')} className='control bottom'></div>
        <div onMouseDown={handleMouseDown.bind(null, 'left')} className='control left'></div>
        <div onMouseDown={handleMouseDown.bind(null, 'topRight')} className='control topRight'></div>
        <div onMouseDown={handleMouseDown.bind(null, 'bottomRight')} className='control bottomRight'></div>
        <div onMouseDown={handleMouseDown.bind(null, 'bottomLeft')} className='control bottomLeft'></div>
        <div onMouseDown={handleMouseDown.bind(null, 'topLeft')} className='control topLeft'></div>
      </div>
    </div>
  );
}

export default ResizeDemo;