import getRectBoundary from './getRectBoundary';

describe('getRectBoundary', () => {
  it('basic', () => {
    const shape = {
      position: {x: 100, y: 100},
      size: {width: 100, height: 100},
    };
    const boundary = getRectBoundary(shape.size, shape.position);
    expect(boundary.top).toBe(100);
    expect(boundary.bottom).toBe(200);
    expect(boundary.left).toBe(100);
    expect(boundary.right).toBe(200);
  });
});