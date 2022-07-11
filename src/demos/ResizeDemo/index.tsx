import React from 'react';
import Resizable from './Resizable2';



const ResizeDemo = () => {
  const [size, setSize] = React.useState({ width: 100, height: 100 });
  return (
    <Resizable
      style={{ border: '1px solid #111' }}
      // size={{ width: 100, height: 100 }} 
      // onResizeStop={(event, direction, delta, size) => {
      //   // console.log(size);
      //   console.log('onResizeStop',size);
      //   setSize({ width: 100, height: 100 });
      // }}
    >
      <div>aadfasdf</div>
    </Resizable>
  );
}

export default ResizeDemo;