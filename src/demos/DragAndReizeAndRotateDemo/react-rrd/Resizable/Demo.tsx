import React from 'react';
import Resizable from './index';

const Demo =  () => {
  const [size, setSize] = React.useState({ width: 100, height: 100 });
  const [position, setPosition] = React.useState({x: 100, y: 100});

  return (
    <Resizable
      size={size}
      position={position}
      rotate={30}
      onResize={(event, direction, size, position) => {
        setSize(size);
        setPosition(position);
      }}
      onResizeStop={(event, direction, size, position) => {
        console.log(size, position);
      }}
    >
      <div>aaaa</div>
    </Resizable> 
  )
};

export default Demo;
