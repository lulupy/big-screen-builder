// - ItemModel
//   - component
//   - position
//   - size
//   - propConfigValue
//   - dataConfigValue // { dataSource, filters,  fieldsMap}
//   - eventConfigValue 

import { IBaseEmitter } from "../components/BaseEmitter";
import { IComponent } from "../component";
import { IPosition, IShape, ISize } from "../page/IPage";

export interface IDataSouceConfig {
  type: string,
  // todo: 不同的DataSource有不同的options, 比如StaticDataSource的options为{ json }
  // ApiDataSource的options为{ url ... }, 怎么来约束不同的options
  options: Record<string, any>, 
}


export interface IDataConfigValue {
  dataSource: IDataSouceConfig,
  filters: string[],
  dataMaps: Record<string, string>,
}

export type ItemEvents = {
  shapeChange: IShape,
  propertiesChange: { [key: string]: unknown },
  dataConfigChange: IDataConfigValue,
};

export interface IItem extends IBaseEmitter<ItemEvents> {
  id: string,
  size: ISize,
  position: IPosition,
  component: IComponent,
  select: () => void,
  setX: (x: number) => void,
  setY: (y: number) => void,
  setWidth: (width: number) => void,
  setHeight: (height: number) => void,
  setPoistion: (position: IPosition) => void;
  setSize: (size: ISize) => void;
  setPropConfigValue: (propName: string, propValue: unknown) => void,
  getPropConfigValue: () => { [key:string] : unknown },
  getShape: () => IShape,
  setDataMap: (key: string, keyMap: string) => void,
  getDataConfigValue: () => IDataConfigValue,
  addFilter: (code: string) => void,
  setDataSource: (dataSource: IDataSouceConfig) => void,
  changeFilter: (index: number, code: string) => void,
  removeFilter: (index: number) => void,
  serialize: () => any,
}