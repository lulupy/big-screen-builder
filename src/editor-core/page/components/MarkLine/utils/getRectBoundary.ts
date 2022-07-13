import { IPosition, ISize } from "../../../IPage";
import { IBoundary } from '../interface';

function getRectBoundary( size: ISize, position: IPosition): IBoundary {
  return {
    top: position.y,
    bottom: position.y + size.height,
    left: position.x,
    right: position.x + size.width,
  }
}

export default getRectBoundary;