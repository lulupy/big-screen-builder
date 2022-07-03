
import { IComponent } from '../component';
import { IItem } from '../item/IItem';
import ItemModel from '../item/ItemModel';
import BaseEmitter from '../BaseEmitter';
import { IPage, IPosition, ISize, ScaleMode, PageEvents } from './IPage';

interface IPageModelOptions {
  size: ISize,
  scaleMode: ScaleMode,
};

const defaultSize = { width: 1000, height: 1000, };

class PageModel extends BaseEmitter<PageEvents> implements IPage {
  size: ISize;
  scaleMode: ScaleMode;
  items: IItem[];
  protected currentItem: IItem | null;
  constructor(options: IPageModelOptions = { size: defaultSize, scaleMode: ScaleMode.uniform }) {
    super();
    this.size = options.size;
    this.scaleMode = options.scaleMode;
    this.items = [];
    this.currentItem = null;
  }
  addItem(size: ISize, position: IPosition, cmpt: IComponent) {
    this.items.push(this.createItem(size, position, cmpt));
    this.emit('itemsChange', this.items);
  }
  createItem(size: ISize, position: IPosition, cmpt: IComponent) {
    const item = new ItemModel({ size, position, component: cmpt });
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
}
export default PageModel;
