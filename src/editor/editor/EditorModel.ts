import { IComponent } from '../component';
import { IEditor } from './IEditor';
import { IPage, PageModel } from '../page';
import React from 'react';



interface IObjectBank<T> {
  getObjects: () => T[],
  getObject: (name: string) => T,
  registerObject: (name: string, object: T) => void;
  deregisterObject: (name: string) => T;  
}

class ObjectBank<T> {
  protected objects: {[name: string]: T};
  constructor() {
    this.objects = {};
  }
  getObjects(): T[] {
    return Object.values(this.objects);
  }
  getObject(name: string) : T{
    if(!this.objects[name]) {
      throw new Error(`${name} is not exist!`);
    }
    return this.objects[name];
  }
  registerObject(name: string, object: T) {
    if(this.objects[name]) {
      throw new Error(`${name} is already exist!`);
    }
    this.objects[name] = object;
  }
  deregisterObject(name: string): T {
    const object = this.objects[name];
    delete this.objects[name];
    return object;
  }
}




class EditorModel implements IEditor {
  protected componentBank: IObjectBank<IComponent>;
  protected inputTypeBank: IObjectBank<React.ReactElement>;
  protected page: IPage;
  
  constructor() {
    // 这里的componentBank和page都是直接创建
    // 依赖了具体实现ObjectBank和PageModel, 而不是依赖接口
    // 后面记得改成通过依赖注入的方式传入, 例如: constructor({ page }: { page: IPage }) 
    // 依赖接口不依赖具体实现的好处之一是，当写测试，可以构造mock对象传入
    this.componentBank = new ObjectBank<IComponent>();
    this.inputTypeBank = new ObjectBank<React.ReactElement>();
    this.page = new PageModel();
  }

  resisterComponent(name:string, cmpt: IComponent) {
    this.componentBank.registerObject(name, cmpt);
    cmpt.setPage(this.page);
  }

  deregisterComponent(name: string) {
    const cmpt = this.componentBank.deregisterObject(name);
    cmpt.setPage(null);
    return cmpt;
  }
  getComponents() {
    return this.componentBank.getObjects();
  }
  getPage() {
    return this.page;
  }
  resisterInputType(name:string, input: React.ReactElement) {
    this.inputTypeBank.registerObject(name, input);
  }

  deregisterInput(name: string) {
    const input = this.inputTypeBank.deregisterObject(name);
    return input;
  }
  getInputType(name: string) {
    return this.inputTypeBank.getObject(name);
  }

}
export default EditorModel;