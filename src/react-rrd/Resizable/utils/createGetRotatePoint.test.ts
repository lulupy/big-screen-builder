import createGetRotatePoint from './createGetRotatePoint';

describe('createGetRotatePoint', () => {
  it('basic', () => {
    const position = { x: 100, y: 100 };
    const size = { width: 100, height: 100 };
    const getRotatePoint = createGetRotatePoint(size, position, 30);
    expect(getRotatePoint('topLeft')).toEqual({x: 131.69872981077805, y: 81.69872981077806});
  });
});