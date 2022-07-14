import { ISize } from '../../../IPage';
import angleToRadian from './angleToRadian';
const { cos, sin, abs } = Math;

interface IRect {
  size: ISize,
  rotate: number,
}

export function getOriginTop (rect: IRect, targetTop: number) {
  const { size, rotate } = rect;
  const _rotate = angleToRadian(rotate);
  const newHeight = abs(size.height * cos(_rotate) + size.width * sin(_rotate));
  const diffY = (newHeight - size.height) / 2;
  const top = targetTop + diffY;
  return top;
}


export function getOriginLeft (rect: IRect, targetLeft: number) {
  const { size, rotate } = rect;
  const _rotate = angleToRadian(rotate);
  const newWidth = abs(size.width * cos(_rotate) + size.height * sin(_rotate));
  const diffX = (size.width - newWidth) / 2;
  const  left = targetLeft - diffX;
  return left;
}