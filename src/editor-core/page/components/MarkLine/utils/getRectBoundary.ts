import { IPosition, IShape, ISize } from "../../../IPage";
import { IBoundary } from '../interface';
import angleToRadian from './angleToRadian';


const { cos, sin } = Math;


export function getRectBoundary({size, position}: {size: ISize, position: IPosition}){
  const reslult =  {
    top: position.y,
    bottom: position.y + size.height,
    left: position.x,
    right: position.x + size.width,
    width: size.width,
    height: size.height,
  }

  return reslult;
 }

export function getRotatedRectBoundary( { size, position, rotate } :IShape): IBoundary {
  const _rotate = angleToRadian(rotate);
  if(rotate === 0) {
    return getRectBoundary({ size, position });
  } else {


    const newWidth = Math.abs(size.width * cos(_rotate) + size.height * sin(_rotate));
    const diffX = (size.width - newWidth) / 2;
    const newX = position.x + diffX;

    const newHeight = Math.abs(size.height * cos(_rotate) + size.width * sin(_rotate));
    const diffY = (newHeight - size.height) / 2;
    const newY = position.y - diffY;

    return getRectBoundary({
      size: {
        width: newWidth,
        height: newHeight,
      },
      position: {
        x: newX,
        y: newY,
      },
    });
  }
}
