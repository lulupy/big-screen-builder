import type { Size, Position, Direction } from '../inteface';

function createGetPoint(size: Size, position: Position) {
  return function getPoint(dir: 'center' | Direction) {
    const x1 = position.x;
    const x2 = x1 + size.width;;
    const y1 = position.y;
    const y2 = y1 + size.height;
    const xMiddle = (x1 + x2) /2;
    const yMiddle = (y1 + y2) /2;
    switch(dir) {
      case 'top':
        return { x: xMiddle, y: y1 };
      case 'right':
        return { x: x2, y: yMiddle };
      case 'bottom':
        return { x: xMiddle, y: y2 };
      case 'left':
        return { x: x1, y: yMiddle };
      case 'topRight':
        return { x: x2, y: y1 };
      case 'bottomRight':
        return { x: x2, y: y2 };
      case 'bottomLeft':
        return { x: x1, y: y2 };
      case 'topLeft':
        return { x: x1, y: y1 };
      case 'center':
        return { x: xMiddle, y: yMiddle };
    }
  }
}

export default createGetPoint;
