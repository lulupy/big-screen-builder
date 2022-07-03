import React from 'react';
import { Rnd } from 'react-rnd';

function DragAndResize() {
  const [[x, y], setPosition] = React.useState([0, 0]);
  const [[width, height], setSize] = React.useState([100, 100]);
  return (
    <Rnd
      size={{ width, height }}
      position={{ x, y }}
      onDragStop={(e, d) => setPosition([d.x, d.y])}
      onResizeStop={(e, direction, ref, delta, position) => 
        setSize([
          width + delta.width,
          height + delta.height,
        ])
      }
    >
      <div>aaa</div>
    </Rnd>
  );
}

export default DragAndResize;