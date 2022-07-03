import { IComponent } from './IComponent';
import { IPage } from '../page';
import { IPosition, ISize } from '../page/IPage';

type IComponentModelProps = Omit<IComponent, 'setPage' | 'addToPage' | 'getPage'>;

class ComponentModel implements IComponent {
  public name;
  public label;
  public icon;
  public Component;
  public ViewComponent;
  public properties;
  public events;
  public actions;
  public dataFields;
  protected page: IPage | null;

  constructor(options: IComponentModelProps) {
    this.name = options.name;
    this.label = options.label;
    this.icon = options.icon;
    this.Component = options.Component;
    this.ViewComponent = options.ViewComponent;
    this.properties = options.properties;
    this.events = options.events;
    this.actions = options.actions;
    this.dataFields = options.dataFields;
    this.page = null;
  }
  setPage(page: IPage | null) {
    this.page = page;
  }
  addToPage(size: ISize, position: IPosition) {
    if(!this.page) {
      throw new Error('cmpt object is not have page, so can\'t add to');
    }
    this.page.addItem(size, position, this);
  }
  getPage() {
    if(!this.page) {
      throw new Error('page has not set yet');
    }
    return this.page;
  }
}

export default ComponentModel;
