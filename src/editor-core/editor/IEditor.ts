import { IComponent } from '../component';
import { IPage } from '../page';

export interface  IEditor {
  resisterComponent: (name:string, cmpt: IComponent) => void;
  deregisterComponent: (name: string) => IComponent;
  getComponents: () => IComponent[],
  getComponent: (name: string) => IComponent,
  getInputType: (name: string) => React.ReactElement,
  getPage: () => IPage | null,
  setPage: (page: IPage) => void,
}