import BaseEmitter from "../BaseEmitter";
import { IComponent } from "../component";
import { IPosition, ISize } from "../page/IPage";
import { IItem, ItemEvents } from "./IItem";


interface IItemModelOptions {
  size: ISize,
  position: IPosition,
  component: IComponent,
};

class ItemModel extends BaseEmitter<ItemEvents> implements IItem {
  id;
  size;
  position;
  component;
  protected propConfigValue: { [key: string]: unknown };
  constructor(options: IItemModelOptions) {
    super();
    this.id = '' + new Date();
    this.size = options.size;
    this.position = options.position;
    this.component = options.component;
    this.propConfigValue = {};
  }
  select(){
    this.component.getPage().setCurrentItem(this);
  }
  setX(x: number)  {
    this.position.x = x;
    this.emitShapeChange();
  }
  setY(y: number)  {
    this.position.y = y;
    this.emitShapeChange();
  }
  setPoistion(position: IPosition) {
    this.position = position;
    this.emitShapeChange();
  }
  setWidth(width: number)  {
    this.size.width = width;
    this.emitShapeChange();
  }
  setHeight(height: number)  {
    this.size.height = height;
    this.emitShapeChange();
  }
  setSize(size: ISize) {
    this.size = size;
    this.emitShapeChange();
  };
  setPropConfigValue(propName: string, propValue: unknown){
    this.propConfigValue[propName] = propValue;
  }
  getPropConfigValue() {
    return this.propConfigValue;
  }
  emitShapeChange() {
    this.emit('shapeChange', this.getShape());
  }
  getShape() {
    return {
      size: this.size,
      position: this.position,
    };
  }
}

export default ItemModel;