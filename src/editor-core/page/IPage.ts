import { IBaseEmitter } from "../components/BaseEmitter";
import { IComponent } from "../component";
import { IItem } from "../item/IItem";
import { DraggableData } from "react-draggable";

export interface ISize {
  width: number,
  height: number,
}

export interface IPosition {
  x: number,
  y: number,
}

export interface IShape {
  size: ISize,
  position: IPosition,
  rotate: number,
}

export enum ScaleMode {
  uniform, // 等比缩放
  stretch, // 拉伸
  filled, // 充满屏幕
  noScale, // 保持原始尺寸
}

export type PageEvents = {
  itemsChange: IItem[];
  currentItemChange: IItem | null,
  itemMove: { item: IItem, data: DraggableData }
  itemMoveStop: IItem,
};


export interface IPage extends IBaseEmitter<PageEvents> {
  scaleMode: ScaleMode,
  size: ISize,
  addItem: (size: ISize, position: IPosition, cmpt: IComponent) => void;
  getItems: () => IItem[],
  setCurrentItem: (item: IItem | null) => void,
  getCurrentItem: () => IItem | null,
  serialize: () => any,
}