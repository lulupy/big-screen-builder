import BaseEmitter from "../components/BaseEmitter";
import { IComponent } from "../component";
import { IPosition, ISize } from "../page/IPage";
import { IDataConfigValue, IDataSouceConfig, IItem, ItemEvents } from "./IItem";


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
  protected dataConfigValue: IDataConfigValue;
  constructor(options: IItemModelOptions) {
    super();
    this.id =  `${-new Date()}`;
    this.size = options.size;
    this.position = options.position;
    this.component = options.component;
    this.propConfigValue = {};
    this.dataConfigValue = {
      filters: [],
      dataMaps: {},
      dataSource: {
        type: 'static', // 目前type没有什么作用, 目前只有静态数据源; 后续希望可以扩展数据源数据库, api等
        options: {
          json: '[]',
        },
      },
    };
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
  getShape() {
    return {
      size: this.size,
      position: this.position,
    };
  }
  emitShapeChange() {
    this.emit('shapeChange', this.getShape());
  }

  setPropConfigValue(propName: string, propValue: unknown){
    this.propConfigValue[propName] = propValue;
    this.emit('propertiesChange', this.propConfigValue);
  }
  getPropConfigValue() {
    return this.propConfigValue;
  }

  getDataMaps() {
    return this.dataConfigValue.dataMaps;
  }
  setDataMap(key: string, keyMap: string) {
    this.dataConfigValue.dataMaps[key] = keyMap;
    this.emitDataConfigChange();
  }
  getDataConfigValue() {
    return this.dataConfigValue;
  }
  addFilter(code: string) {
    this.dataConfigValue.filters.push(code);
    this.emitDataConfigChange();
  }
  changeFilter(index: number, code: string) {
    this.dataConfigValue.filters[index] = code;
    this.emitDataConfigChange();
  }
  removeFilter(index: number) {
    this.dataConfigValue.filters.splice(index, 1);
    this.emitDataConfigChange();
  }
  setDataSource(dataSource: IDataSouceConfig) {
    this.dataConfigValue.dataSource = dataSource;
    this.emitDataConfigChange();
  }


  emitDataConfigChange() {
    this.emit('dataConfigChange', this.getDataConfigValue());
  }


}

export default ItemModel;