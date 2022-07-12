import createGetPoint from './createGetPoint';

describe('createGetPoint', () => {
  it('basic', () => {
    const position = { x: 100, y: 100 };
    const size = { width: 100, height: 100 };
    const getPoint = createGetPoint(size, position);
    expect(getPoint('top')).toEqual({x: 150, y: 100});
    expect(getPoint('right')).toEqual({x: 200, y: 150}); 
    expect(getPoint('bottom')).toEqual({x: 150, y: 200}); 
    expect(getPoint('left')).toEqual({x: 100, y: 150}); 
    expect(getPoint('topRight')).toEqual({x: 200, y: 100}); 
    expect(getPoint('bottomRight')).toEqual({x: 200, y: 200}); 
    expect(getPoint('bottomLeft')).toEqual({x: 100, y: 200}); 
    expect(getPoint('topLeft')).toEqual({x: 100, y: 100});
  });
});