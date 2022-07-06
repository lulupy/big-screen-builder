import mitt, { EventType, Handler } from 'mitt';


export type EventsType = Record<EventType, unknown>;

// export type IBaseEmitter<Events extends EventsType> = Omit<Emitter<Events>, 'all'>;
export interface IBaseEmitter<Events extends EventsType> {
	on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
	off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void;
	emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
}


// <T extends Y> 在范型中使用extends时，这里的意思不是T要继承Y，而是希望传入的T必须满足Y的约束
class BaseEmitter<Events extends EventsType = EventsType> {
  protected eventBus;
  constructor() {
    this.eventBus = mitt<Events>();
  };
  on<Key extends keyof Events>(type: Key, hanlder: Handler<Events[Key]>){
    this.eventBus.on(type, hanlder);
  }
  off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>) {
    this.eventBus.off(type, handler);
  }
  emit<Key extends keyof Events>(type: Key, event: Events[Key]) {
    this.eventBus.emit(type, event);
  }
}

export default BaseEmitter;
