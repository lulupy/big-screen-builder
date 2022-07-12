import React from 'react';
import RotateControl from './index';

const Demo =  () => {
  const [rotate, setRotate] = React.useState(30);
  const boxRef = React.useRef(null);


  return (
    <div
      ref={boxRef}
      style={{
        width: 100,
        height: 100,
        margin: 100,
        border: '1px solid #111',
        position: 'relative',
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <RotateControl
        box={boxRef}
        rotate={rotate}
        onRotate={(changedRotate) => {
          setRotate(changedRotate);
        }}
      />
      aaa
    </div> 
  )
};

export default Demo;
