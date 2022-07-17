import { IComponent } from '../component';
import { IPage } from '../page';

export interface  IEditor {
  resisterComponent: (name:string, cmpt: IComponent) => void;
  deregisterComponent: (name: string) => IComponent;
  getComponents: () => IComponent[],
  getComponent: (name: string) => IComponent,
  getInputType: (name: string) => React.ReactElement,
  getPage: () => IPage | null,
  // 禁止设置page, 保持page对象不可变
  // setPage: (page: IPage) => void,
}