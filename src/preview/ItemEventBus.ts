import mitt, { Handler } from 'mitt';
const emitter = mitt<{ dispathEvent: any, [key: string]: any }>();

emitter.on('dispathEvent', ({ target, action }) => {
  console.log(`action.${action}.${target}`)
  emitter.emit(`action.${action}.${target}`);
});

// action.refresh.-1657092518605



// emitter.on('test.-1657092518605', () => {
//   console.log(1111);
// })

// emitter.emit('test.-1657092518605')

class ItemEventBus {
  protected id: string;
  protected eventConfig: any;
  constructor(id: any, eventConfig: any) {
    this.id = id;
    this.eventConfig = eventConfig;
  }
  on(type: string, hanlder: Handler<any>) {
    emitter.on(`action.${type}.${this.id}`, hanlder);
  }
  off(type: string, hanlder: Handler<any>) {
    emitter.off(`action.${type}.${this.id}`, hanlder);
  }
  emit(type: string) {
    emitter.emit('dispathEvent', this.eventConfig[type])
  }
}

export default ItemEventBus;
