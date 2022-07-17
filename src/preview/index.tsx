import { url } from 'inspector';
import React from 'react';
import {IPage} from '../editor-core';
import { ISize, ScaleMode } from '../editor-core/page/IPage';
import ItemWrapper from './ItemWrapper';

const backgroundImage = 'http://datav-react.jiaminghi.com/demo/electronic-file/static/media/bg.110420cf.png';

interface IPreviewProps {
  page: IPage,
};

function getViewportSize():ISize {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
}



function getStyle(size: ISize, viewport: ISize, scaleMode: ScaleMode): React.CSSProperties {
  // // 等比缩放
  if(scaleMode === ScaleMode.uniform) {
    const AspectRatio = size.width / size.height; // 宽高比
    const ViewAspectRatio = viewport.width / viewport.height;
    let scale;
    if(AspectRatio > ViewAspectRatio) {
      scale  = viewport.width / size.width;
    } else { 
      // 调整size.height到viewport.height
      scale  = viewport.height / size.height;
    }
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transformOrigin: '0px 0px',    transform: `scale(${scale}) translate(-50%, -50%)`,

    };
  } else if (scaleMode === ScaleMode.stretch) {
    // 拉伸
    const scaleX = viewport.width / size.width;
    const scaleY = viewport.height / size.height;
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0px 0px',
      transform: `scale(${scaleX}, ${scaleY})`,
    };
  } else if (scaleMode === ScaleMode.filled) {
    // 充满屏幕
    const AspectRatio = size.width / size.height; // 宽高比
    const ViewAspectRatio = viewport.width / viewport.height;
    let scale;
    if(AspectRatio > ViewAspectRatio) {
      scale  = viewport.height / size.height;
    } else { 
      scale  = viewport.width / size.width;
    }
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0px 0px',
      transform: `scale(${scale})`,
    };
  } else {
    // 原始尺寸
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transformOrigin: '0px 0px',
      transform: `translate(-50%, -50%)`,
    }
  }
}

const Preview = ({ page }: IPreviewProps) => {
  const items = page.getItems();
  const { size, scaleMode, backgroundColor } = page.getConfig();
  const [viewport, setViewport] = React.useState(getViewportSize());
  
  const style = getStyle(size, viewport, scaleMode);
  const handleResize = () => {
    setViewport(getViewportSize());
  };
  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor,
      }}
    >
      <div
        style={{
          width: size.width,
          height: size.height,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          
          backgroundImage: `url(${backgroundImage})`,
          ...style,
        }}
      >
        {items.map(item => <ItemWrapper item={item} />)}
      </div>

    </div>
  )
}

export default React.memo(Preview);
