
import { IComponent } from '../component';
import { IItem } from '../item/IItem';
import ItemModel from '../item/ItemModel';
import BaseEmitter from '../components/BaseEmitter';
import { IPage, IPosition, ISize, ScaleMode, PageEvents } from './IPage';
import { DeserializeEvent } from '../interface';

interface IPageModelOptions {
  size: ISize,
  scaleMode: ScaleMode,
  backgroundColor?: string,
};

const defaultSize = { width: 1920, height: 1080, };

class PageModel extends BaseEmitter<PageEvents> implements IPage {
  private id: string;
  size: ISize;
  scaleMode: ScaleMode;
  backgroundColor: string;
  items: IItem[];
  protected currentItem: IItem | null;
  constructor(options: IPageModelOptions = { size: defaultSize, scaleMode: ScaleMode.uniform }) {
    super();
    this.id = `${+new Date()}`;
    this.size = options.size;
    this.scaleMode = options.scaleMode;
    this.backgroundColor = options.backgroundColor || '#fff';
    this.items = [];
    this.currentItem = null;
  }
  setWidth(width: number) {
    this.size.width = width;
    this.emit('configChange', this.getConfig());
  }
  setHeight(height: number) {
    this.size.height = height;
    this.emit('configChange', this.getConfig());
  }
  setScaleMode(scaleMode: ScaleMode) {
    this.scaleMode = scaleMode;
    this.emit('configChange', this.getConfig());
  }
  setBackgroundColor(color: string) {
    this.backgroundColor = color;
    this.emit('configChange', this.getConfig());
  }
  getConfig() {
    return {
      size: this.size,
      scaleMode: this.scaleMode,
      backgroundColor: this.backgroundColor,
    };
  }
  addItem(size: ISize, position: IPosition, cmpt: IComponent) {
    this.items.push(this.createItem(size, position, cmpt));
    this.emit('itemsChange', this.items);
  }
  removeItem(item: IItem) {
    this.items = this.items.filter(it => item !== it);
    this.emit('itemsChange', this.items);

    if(item === this.currentItem) {
      this.setCurrentItem(null);
    }
  }
  clearItems () {
    this.items = [];
    this.emit('itemsChange', this.items);
  }
  createItem(size: ISize, position: IPosition, cmpt: IComponent) {
    const item = new ItemModel({ size, position, rotate: 0, component: cmpt });
    return item;
  }
  getItems() {
    return this.items;
  }
  setCurrentItem(item: IItem | null) {
    this.currentItem = item;
    this.emit('currentItemChange', item);
  }
  getCurrentItem() {
    return this.currentItem;
  }
  swapItem(index1: number, index2: number) {
    const temp = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = temp;
    this.emit('itemsChange', this.items);
    
  }
  // 上移
  upItem(item: IItem): boolean {
    console.log('上移')
    const index = this.items.findIndex(it => item === it);
    if(index >= this.items.length - 1) { // 到顶了
      return false;
    }
    this.swapItem(index, index + 1);
    return true;
  }
  // 下移
  downItem(item: IItem): boolean {
    const index = this.items.findIndex(it => item === it);
    if(index <= 0) { // 到底了
      return false;
    }
    this.swapItem(index, index - 1);
    return true;
  }
  // 置顶
  topItem(item: IItem) {
    const index = this.items.findIndex(it => item === it);
    if(index === this.items.length - 1) return false;

    this.items.splice(index, 1);
    this.items.push(item);
    this.emit('itemsChange', this.items);
    return true;
  }
  // 置底
  bottomItem(item: IItem) {
    const index = this.items.findIndex(it => item === it);
    if(index === 0) return false;

    this.items.splice(index, 1);
    this.items.unshift(item);
    this.emit('itemsChange', this.items);
    return true;

  }
  serialize() {
    return {
      size: this.size,
      scaleMode: this.scaleMode,
      backgroundColor: this.backgroundColor,
      items: this.items.map(item => item.serialize()),
    };
  }
  deserialize({data, editor}:  DeserializeEvent<PageModel>) {
    this.size = data.size;
    this.scaleMode = data.scaleMode;
    this.backgroundColor = data.backgroundColor;
    this.items = data.items.map(item => ItemModel.deserialize({ data: item, editor }));
    this.emit('itemsChange', this.items);
    return this;
  }
}
export default PageModel;
