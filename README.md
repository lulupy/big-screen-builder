# 类

- EditorModel
  - components
  - inputs
  - page
- ComponentModel
  - name
  - label
  - icon
  - properties
  - events // 事件声明
  - actions // 动作声明
  - dataFields // 字段声明
- PageModel
  - items
  - size // width * height
  - scaleMode // 缩放方式
- ItemModel
  - component
  - position
  - size
  - propConfigValue
  - dataConfigValue // { dataSource, filters,  fieldsMap}
  - eventConfigValue 

- DataSource
  - getData() // promise

```jsx
// 事件发起者
function Bar({ eventBus, id, eventConfig }) {
  return (
    // 触发在compoent声明的events
    <button onClick={() => eventBus.fire('dispathEvent', eventConfig['event1'])}>btn</button>
  );
}

eventBus.on(('dispathEvent', { target, action }) => {
    eventBus.fire(`action.${action}.${target}`);
})

// 目标
function Foo ({ ...,id, , eventBus }) {
  React.useEffect(() => {
    // action1需要包含在动作声明中
    eventBus.on(`action.action1.${id}`, () => {
      // 执行一些操作
    });
  });
}
```

## DataSource设计

```ts
abstract class AbstractDataSource {
  filters;
  dataMaps;

  abstract getOriginData()
  aync getData(){
    const originData = await this.getOriginData();

    this.filters;
    this.dataMaps;

    const data = this.filters.reduce((data, filterString) => {
      const filterFn = this.createFilterFn(filterString);
      return filterFn(data);
    }, originData);

    return data.map(record => {
      const newRecord = {};
      Object.entries(this.dataMaps).forEach([key, keyMap]) {
        newRecord[key] = record[keyMap];
      }
      return newRecord;
    })

  }
  createFilterFn(filterString) {
    return new Function('data', fnString);
  }
}

class StaitcDataSource extends AbstractDataSource {
  data;
  getOriginData() {

  }
}
```

### 过滤器

```js
// 输入是一个数组
function filter(data) {
  // 输出也是一个数组
  return data;
}
```

```js
const fn = new Function('data', `return data`);
```



## h5-dooring中模块联邦的使用

[h5-dooring](https://github.com/MrXujiang/h5-Dooring)

h5-dooring中有两个子项目: eidor和ui。

其中editor会使用ui的一些模块, 所以使用模块联邦将ui的一些模块暴露出来.

ui的webpack相关配置如下:

```js
new ModuleFederationPlugin({
  name: "dooringUI",
  library: { type: 'umd', name: 'dooringUI' },
  filename: 'remoteEntry.js', // dooringUI的入口文件
  exposes: { // 需要暴露的模块
    "./viewRender": './src/renderer/ViewRender',
    "./loader": './src/renderer/DynamicEngine',
    "./components": './src/ui-component/index',
  },
  shared: { react: { eager: true , requiredVersion: '17.x' }, "react-dom": { eager: true , requiredVersion: '17.x'  } }
})
```

eidor的webpack相关配置如下:

```js
new ModuleFederationPlugin({
  name: "dooringEditor",
  remotes: {
    dooringUI: "dooringUI@//localhost:8008/remoteEntry.js" // 包含两个信息: remoteEntry.js文件位置和依赖的模块联邦名字
  },
  shared: { react: { singleton: true, eager: true, requiredVersion: '17.x' }, "react-dom": { singleton: true,eager: true, requiredVersion: '17.x' }, }
})
```

然后在editor中就可以像使用其它模块一样使用模块联邦模块:

```js
import dooringCompt from 'dooringUI/components';
```