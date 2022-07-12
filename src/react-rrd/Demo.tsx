import React from 'react';
import Rrd from '.';

const DemoWithNoProps = () => {
  return (
  <Rrd>
    <div>aaaa</div>
  </Rrd>
  );
};

const DemoWtihProps = () => {
  return (
    <Rrd
      position={{x: 100, y: 100}}
      rotate={60}
      size={{width: 100, height: 100}}
    >
      <div>aaa</div>
    </Rrd>
  );
}

const DemoWithPropsChange = () => {
  const [position, setPosition] = React.useState({x: 100, y: 100});
  const [rotate, setRotate] = React.useState(60);
  const [size, setSize] = React.useState({width: 100, height: 100});
  return (
    <Rrd
      // style={{ border: '1px solid #111' }}
      // enableResizing={false}
      // enableRotate={false}
      position={position}
      rotate={rotate}
      size={size}
      onDragStop={(e, data) => {
        setPosition({x: data.x, y: data.y});
      }}
      onResizeStop={(event, dir, size, position) => {
        // 改变 size 和 position
        setSize(size);
        setPosition(position);
      }}
      onRotateStop={(rotate) => {
        setRotate(rotate);
      }}
    >
      <div>aaa</div>
    </Rrd>
  );
}
const DragAndReizeAndRotateDemo = () => {
  return <div>
    {/* <DemoWithNoProps></DemoWithNoProps> */}
    {/* <DemoWtihProps></DemoWtihProps> */}
    <DemoWithPropsChange></DemoWithPropsChange>
  </div>
}

export default DragAndReizeAndRotateDemo;