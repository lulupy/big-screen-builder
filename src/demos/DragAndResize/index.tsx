import React from 'react';
import { Rnd } from './react-rnd';
import { RedoOutlined } from '@ant-design/icons';

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

export default DragAndResize;