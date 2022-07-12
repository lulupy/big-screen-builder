import { getMarkLineShowMap, getAllMarkLineShowMap } from './getMarkLineShowMap';

describe('getAllMarkLineShowMap', () => {
  it('basic', () => {
    const target = {
      top: 100,
      left: 100,
      right: 200,
      bottom: 150,
    };
    const current = {
      top: 50,
      left: 100,
      right: 200,
      bottom: 80,
    };

    expect(getAllMarkLineShowMap(target, current)).toEqual({
      topX: null,
      centerX: null,
      bottomX: null,
      leftY: 100,
      centerY: 150,
      rightY: 200,
    });
  });

  it('两个box紧贴', () => {
    const target = {
      top: 100,
      left: 100,
      right: 200,
      bottom: 150,
    };
    const current = {
      top: 50,
      left: 100,
      right: 200,
      bottom: 100,
    };


    expect(getAllMarkLineShowMap(target, current)).toEqual({
      topX: 100,
      centerX: null,
      bottomX: null,
      leftY: 100,
      centerY: 150,
      rightY: 200,
    });
  });
});

describe('getMarkLineShowMap', () => {
  it('basic', () => {
    const target = {
      top: 100,
      left: 100,
      right: 200,
      bottom: 150,
    };
    const current = {
      top: 50,
      left: 100,
      right: 200,
      bottom: 80,
    };

    //  向右拖动
    expect(getMarkLineShowMap(target, current, true, true)).toEqual({
      topX: null,
      centerX: null,
      bottomX: null,
      leftY: null,
      centerY: null,
      rightY: 200,
    });

    //  向左拖动
    expect(getMarkLineShowMap(target, current, false, true)).toEqual({
      topX: null,
      centerX: null,
      bottomX: null,
      leftY: 100,
      centerY: null,
      rightY: null,
    });
  });

  it('两个box紧贴', () => {
    const target = {
      top: 100,
      left: 100,
      right: 200,
      bottom: 150,
    };
    const current = {
      top: 50,
      left: 100,
      right: 200,
      bottom: 100,
    };


    expect(getMarkLineShowMap(target, current, true, true)).toEqual({
      topX: 100,
      centerX: null,
      bottomX: null,
      leftY: null,
      centerY: null,
      rightY: 200,
    });

    expect(getMarkLineShowMap(target, current, false, true)).toEqual({
      topX: 100,
      centerX: null,
      bottomX: null,
      leftY: 100,
      centerY: null,
      rightY: null,
    });
  });
});