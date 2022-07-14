import React from 'react';
import { useSize } from 'ahooks';

// 解决DataV组件的宽高异常问题: http://datav-react.jiaminghi.com/guide/#用前必看
// DataV中组件监听window.resize事件后对内部svg重置height,width; 所以当调整容器大小后, dataV中的组件不会调整内部大小
const DataVWrapper = ({ children }: any) => {
  const ref = React.useRef(null);
  const size = useSize(ref);
  return (
    <div style={{width: '100%', height: '100%'}} ref={ref}>
      {React.cloneElement(children, {key: `node-${size?.width}-${size?.height}`})}
    </div>
  );
}

export default DataVWrapper;
