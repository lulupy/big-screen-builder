import type { Position } from '../inteface';

function angleToRadian(angle: number) {
  return angle * Math.PI / 180
}

/**
 * 将point以center为中心旋转
 * @param    point  旋转前的点坐标
 * @param    rotateCenter 旋转中心
 * @param    rotate 旋转的角度
 * @return    旋转后的坐标
 */
function rotatePoint(point: Position, rotateCenter: Position, rotate: number): Position{
  return {
    x: (point.x - rotateCenter.x) * Math.cos(angleToRadian(rotate)) - (point.y - rotateCenter.y) * Math.sin(angleToRadian(rotate)) + rotateCenter.x,
    y: (point.x - rotateCenter.x) * Math.sin(angleToRadian(rotate)) + (point.y - rotateCenter.y) * Math.cos(angleToRadian(rotate)) + rotateCenter.y,
  }
  // const x = point.x - center.x;
  // const y = point.y - center.y;
  // const rotateMatrix = mat2.create();
  // mat2.fromRotation(rotateMatrix, rotate * (Math.PI / 180));
  // const out: any = [];
  // vec2.transformMat2(out, [x, y], rotateMatrix);
  // return {
  //   x: out[0] + center.x,
  //   y: out[1] + center.y,
  // }
}

export default rotatePoint;