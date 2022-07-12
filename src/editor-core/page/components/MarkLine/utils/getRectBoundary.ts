import { IShape } from "../../../IPage";
import { IBoundary } from '../interface';

function getRectBoundary(shape: IShape): IBoundary {
  const { size, position } = shape;
  return {
    top: position.y,
    bottom: position.y + size.height,
    left: position.x,
    right: position.x + size.width,
  }
}

export default getRectBoundary;