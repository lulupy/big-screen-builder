import Vector2  from "./Vector2";

describe('Vector2', () => {
  it('normalize', () => {
    const vec = new Vector2(0, 10);
    vec.normalize();
    expect(vec.x).toBe(0);
    expect(vec.y).toBe(1);
  });

  it('scale', () => {
    const vec = new Vector2(10, 0);
    vec.scale(3);
    expect(vec.x).toBe(30);
    expect(vec.y).toBe(0);
  });

  it('dot', () => {
    const vec = new Vector2(1, 0);
    const vec2 = new Vector2(1, 10);
    expect(vec.dot(vec2)).toBe(1);
    expect(vec2.dot(vec)).toBe(1);
  });
  it('add', () => {
    const vec = new Vector2(1, 1);
    const vec2 = new Vector2(1, 0);
    expect(vec.add(vec2).x).toBe(2);
    expect(vec.add(vec2).y).toBe(1);
  });
});
