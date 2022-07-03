// - ItemModel
//   - component
//   - position
//   - size
//   - propConfigValue
//   - dataConfigValue // { dataSource, filters,  fieldsMap}
//   - eventConfigValue 

import { IBaseEmitter } from "../BaseEmitter";
import { IComponent } from "../component";
import { IPosition, IShape, ISize } from "../page/IPage";

export type ItemEvents = {
  shapeChange: IShape,
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
}