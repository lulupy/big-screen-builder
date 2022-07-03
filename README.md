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
