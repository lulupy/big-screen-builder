
import { IComponent } from '../component';
import { IItem } from '../item/IItem';
import ItemModel from '../item/ItemModel';
import BaseEmitter from '../components/BaseEmitter';
import { IPage, IPosition, ISize, ScaleMode, PageEvents } from './IPage';
import { DeserializeEvent } from '../interface';

interface IPageModelOptions {
  size: ISize,
  scaleMode: ScaleMode,
};

const defaultSize = { width: 1000, height: 1000, };

class PageModel extends BaseEmitter<PageEvents> implements IPage {
  private id: string;
  size: ISize;
  scaleMode: ScaleMode;
  items: IItem[];
  protected currentItem: IItem | null;
  constructor(options: IPageModelOptions = { size: defaultSize, scaleMode: ScaleMode.uniform }) {
    super();
    this.id = `${+new Date()}`;
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
  serialize() {
    return {
      size: this.size,
      scaleMode: this.scaleMode,
      items: this.items.map(item => item.serialize()),
    };
  }
  static deserialize({data, editor}:  DeserializeEvent<PageModel>) {
    const page = new PageModel({
      size: data.size,
      scaleMode: data.scaleMode,
    });
    page.items = data.items.map(item => ItemModel.deserialize({ data: item, editor }));
    return page;
  }
}
export default PageModel;
