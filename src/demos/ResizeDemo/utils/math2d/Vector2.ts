import { vec2 } from 'gl-matrix';

class Vector2  {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  static fromArray(arr: [number, number] | Float32Array){
    
    return new Vector2(arr[0], arr[1]);
  }
  fromArray(arr: [number, number] | Float32Array) {
    this.x = arr[0];
    this.y = arr[1];
  }
  toArray(): [number, number] {
    return [this.x, this.y];
  }
  toPositon() {
    return {
      x: this.x,
      y: this.y,
    };
  }
  normalize() {
    const out = vec2.create();
    vec2.normalize(out, this.toArray());
     this.fromArray(out);
     return this;
  }
  dot(vector: Vector2) {
    return vec2.dot(vector.toArray(), this.toArray());
  }
  clone() {
    return  new Vector2(...this.toArray());
  }
  scale(b: number) {
    const out = vec2.create();
    vec2.scale(out, this.toArray(), b);
    this.fromArray(out);
    return this;
  }
  add(vector: Vector2) {
    const out = vec2.create();
    vec2.add(out, this.toArray(), vector.toArray());
    return Vector2.fromArray(out);
  }

}


export default Vector2;