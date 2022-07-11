import  rotatePoint from './rotatePoint';

describe('rotatePoint', () => {
  it('basic', () => {
    const center = {
      x: 150,
      y: 150,
    };

    expect(rotatePoint({x: 100, y: 100}, center, 30)).toEqual({x: 131.69872981077805, y: 81.69872981077806});
    expect(rotatePoint({x: 170, y: 219}, center, -30)).toEqual({x: 201.82050807568876, y: 199.75575286112627});
  });

  it('exmaple', () => {
    // 矩形初始状态为: position: { x: 100, y: 100 }, size: { width: 100, height: 100 }, 旋转了30度
    // 现在拓展topLeft点至{ x: 121, y: 34 }

    // [100, 100] 以 center为中心旋转30度为
    const start = {
      x: 131, y: 81
    };
    const center = {
      x: 150, y: 150,
    };

    const newTopLeft = { x: 121, y: 34 }

    // [200, 200] 以 center为中心旋转30度
    // const symmetric = {x: 169, y: 219};
    const bottomRight = {
      x: center.x - (start.x - center.x),
      y: center.y - (start.y - center.y),
    };

    

    const newCenter = {
      x: (newTopLeft.x + bottomRight.x) /2,
      y: (newTopLeft.y + bottomRight.y) /2,
    };


    expect(rotatePoint(bottomRight, newCenter, -30)).toEqual({x: 212.03460969082653, y: 194.6073498500606});
    expect(rotatePoint(newTopLeft, newCenter, -30)).toEqual({x: 77.96539030917347, y: 58.39265014993941});
  });

});

// x: 79: y: 60 width : 134 height: 136
// new x: 121, y: 34