import type { Size, Position, Direction } from '../inteface';
import createGetPoint from './createGetPoint';
import rotatePoint from './rotatePoint';

function createGetRotatePoint(size: Size, position: Position, rotate: number) {

  const getPoint = createGetPoint(size, position);
  const center = getPoint('center');
  return function (dir: 'center' | Direction) {
    const point = getPoint(dir);
    return rotatePoint(point, center, rotate);
  }
}

export default createGetRotatePoint;