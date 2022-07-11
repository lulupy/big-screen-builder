import React from 'react';
import { Rnd } from './react-rnd';
import {  default as DraggableRoot } from "react-draggable";
import { Enable, Resizable, ResizeDirection } from "re-resizable";
const Draggable: any = DraggableRoot;

const Child = ({ style, ...other }: any) => {
  return (
    <div
      {...other}
      style={{
        ...style,
        transform: `${style.transform || ''}  rotate(70deg)`,
      }}
    />
  )
}




const TransformOverride = ({ transform, children }: any) => {
  return React.cloneElement(children, {
    style: {
      ...children.style,
      transform: `${children.style.transform || 0} ${transform}`,
    }
  });
}

function DragAndResize() {

  return (
    <Rnd style={{ border: '1px solid #111' }}>
      <div style={{ background: 'green' }}>
        aaa
        asdfa
        asdfaasdfa
        sdf
        ads
      </div>
    </Rnd>
    
  );
}

const  DraggableDemo = () => {
  return (
    <Draggable position={{ x: 0, y: 0 }}>
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
    </Draggable>
  );
}


const ResizableDemo = () => {
  return (
    <Resizable
      style={{ border: '1px solid #111' }}
      // size={{width: 100, height: 100}}
    > 
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
    </Resizable>
  );
}
export default ResizableDemo;