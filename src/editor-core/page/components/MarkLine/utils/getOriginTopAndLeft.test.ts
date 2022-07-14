import  { getOriginTop, getOriginLeft } from './getOriginTopAndLeft';

describe('getOriginTopAndLeft', () => {
  it('旋转30度', () => {
    const rect = {
      size: {
        width: 100,
        height: 100,
      },
      rotate: 30,
    };

    const targetTop = 81.69872981077806;
    const targetLeft = 81.69872981077806;
    expect(getOriginTop(rect, targetTop)).toBe(100);
    expect(getOriginLeft(rect, targetLeft)).toBe(100);
  });

  it('旋转-150度', () => {
    const rect = {
      size: {
        width: 100,
        height: 100,
      },
      rotate: -150,
    };

    const targetTop = 81.69872981077806;
    const targetLeft = 81.69872981077806;
    expect(Math.round(getOriginTop(rect, targetTop))).toBe(100);
    expect(Math.round(getOriginLeft(rect, targetLeft))).toBe(100);
  });
});