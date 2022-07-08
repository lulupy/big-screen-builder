import React from 'react';
import Draggable from 'react-draggable';


const Child = ({ style, ...other }: any) => {
  return (
    <div
      {...other}
      style={{
        ...style,
        transform: `${style.transform || ''} rotate(70deg)`,
      }}
    />
  )
}

const DraggableDemo = () => {
  return (
    <Draggable>
      <Child style={{ background: 'green', width: 200 }}>aasdfasdfasdf
        asdf
        asdf
        asdf
        asdf
        asdf
        a
      </Child>
    </Draggable>
  );
}

export default DraggableDemo;