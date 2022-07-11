import React from 'react';
import Rrd from './react-rrd';

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
      position={{x: 0, y: 0}}
      rotate={60}
      size={{width: 100, height: 100}}
    >
      <div>aaa</div>
    </Rrd>
  );
}

const DemoWithPropsChange = () => {
  const [position, setPosition] = React.useState({x: 0, y: 0});
  const [rotate, setRotate] = React.useState(60);
  const [size, setSize] = React.useState({width: 100, height: 100});
  return (
    <Rrd
      position={position}
      rotate={rotate}
      size={size}
      onDragStop={() => {
        setPosition({x: 100, y: 100});
      }}
      onResizeStop={() => {
        // 改变 size 和 position
        setSize({width: 200, height: 200});
      }}
      onRotateStop={() => {
        setRotate(90);
      }}
    >
      <div>aaa</div>
    </Rrd>
  );
}
const DragAndReizeAndRotateDemo = () => {
  return <div>
    <DemoWithNoProps></DemoWithNoProps>
    <DemoWtihProps></DemoWtihProps>
    <DemoWithPropsChange></DemoWithPropsChange>
  </div>
}

export default DragAndReizeAndRotateDemo;