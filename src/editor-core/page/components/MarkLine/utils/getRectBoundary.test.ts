import { getRectBoundary, getRotatedRectBoundary } from './getRectBoundary';

describe('getRectBoundary', () => {
  it('没有旋转', () => {
    const shape = {
      position: {x: 100, y: 100},
      size: {width: 100, height: 100},
    };
    const boundary = getRectBoundary(shape);
    expect(boundary.top).toBe(100);
    expect(boundary.bottom).toBe(200);
    expect(boundary.left).toBe(100);
    expect(boundary.right).toBe(200);
  });
});


describe('getRotatedRectBoundary', () => {
  it('basic', () => {
    const shape = {
      position: {x: 100, y: 100},
      size: {width: 100, height: 100},
      rotate: 30,
    };
    const boundary = getRotatedRectBoundary(shape);
    expect(boundary).toEqual({
      top: 81.69872981077806,
      bottom: 218.30127018922195,
      left: 81.69872981077806,
      right: 218.30127018922195,
      height: 136.60254037844388,
      width: 136.60254037844388,
    })
  });

  it('basic2', () => {
    const shape = {
      position: {x: 100, y: 100},
      size: {width: 100, height: 100},
      rotate: -150,
    };
    const boundary = getRotatedRectBoundary(shape);
    expect(boundary).toEqual({
      top: 81.69872981077806,
      bottom: 218.30127018922195,
      left: 81.69872981077806,
      right: 218.30127018922195,
      height: 136.60254037844388,
      width: 136.60254037844388,
    })
  });
});