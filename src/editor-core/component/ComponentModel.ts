import { DataFieldDeclaration, IActionDeclaration, IComponent, IEventDeclaration, IProperty } from './IComponent';
import { IPage } from '../page';
import { IPosition, ISize } from '../page/IPage';
import DefaultComponent from './DefaultComponent';
import DefaultViewComponent from './DefaultViewComponent';
interface IComponentModelProps  {
  name: string,
  label: string,
  icon?: string,
  defaultSize?: ISize,
  Component?: React.ElementType,
  ViewComponent?: React.ElementType,
  properties?: IProperty[],
  events?: IEventDeclaration[],
  actions?: IActionDeclaration[],
  dataFields?: DataFieldDeclaration[],
};




class ComponentModel implements IComponent {
  public name;
  public label;
  public icon;
  public defaultSize;
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
    this.defaultSize = options.defaultSize || { width: 100, height: 100 };
    this.Component = options.Component || DefaultComponent;
    this.ViewComponent = options.ViewComponent || DefaultViewComponent;
    this.properties = options.properties || [];
    this.events = options.events || [];
    this.actions = options.actions || [];
    this.dataFields = options.dataFields || [];
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
