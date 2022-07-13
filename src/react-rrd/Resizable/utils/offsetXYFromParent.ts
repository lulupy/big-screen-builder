interface EventWithOffset {
  clientX: number, clientY: number
}

export function offsetXYFromParent(evt: EventWithOffset, offsetParent: Element, scale: number) {
  const isBody = offsetParent === offsetParent.ownerDocument.body;
  const offsetParentRect = isBody ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();

  // 这里只考虑了PC端的情况, 如果需要考虑移动端的话, 那么对应的事件为React.TouchEvent
  // 并且需要对取clientX做兼容, 对于TouchEvent： event: touches[0].clientX
  // 可以参考代码: https://github.com/bokuweb/re-resizable/blob/master/src/index.tsx#L677-L689
  const x = (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left) / scale;
  const y = (evt.clientY + offsetParent.scrollTop - offsetParentRect.top) / scale;

  return {x, y};
}