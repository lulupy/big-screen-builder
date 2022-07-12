import { IBoundary, IMarkLineShowMap } from '../interface';

function isNearly(targetValue: number, CurrentValue: number) {
  const diff = 3;
  return Math.abs(CurrentValue - targetValue) <= diff;
};
export function getAllMarkLineShowMap(target: IBoundary, current: IBoundary) {
  const markLineShowMap: IMarkLineShowMap = {
    topX: null,
    centerX: null,
    bottomX: null,
    leftY: null,
    centerY: null,
    rightY: null,
  };
  // x
  if(isNearly(current.top, target.top)) {
    markLineShowMap.topX = target.top;
  }

  if(isNearly(current.bottom, target.top)) {
    markLineShowMap.topX = target.top;
  }

  if(isNearly((current.top + current.bottom) / 2, (target.top + target.bottom) / 2)) {
    markLineShowMap.centerX = (target.top + target.bottom) / 2;
  }

  if(isNearly(current.top, target.bottom)) {
    markLineShowMap.bottomX = target.bottom;
  }
  if(isNearly(current.bottom, target.bottom)) {
    markLineShowMap.bottomX = target.bottom;
  }

  // y
  if(isNearly(current.left, target.left)) {

    markLineShowMap.leftY = target.left;
  }

  if(isNearly(current.right, target.left)) {
    markLineShowMap.leftY = target.left;
  }

  if(isNearly((current.left + current.right) / 2, (target.left + target.right) / 2)) {
    markLineShowMap.centerY = (target.left + target.right) / 2;
  }

  if(isNearly(current.left, target.right)) {
    markLineShowMap.rightY = target.right;
  }

  if(isNearly(current.right, target.right)) {
    markLineShowMap.rightY = target.right;
  }
  return markLineShowMap;
}




/**
 * 
 * @param target 目标box
 * @param current 拖懂box
 * @param isDownward y轴上拖动方向, 为true表示向下, 否则表示向上
 * @param isRightward x轴上拖动方向, 为true表示向右, 否则表示向左
 */
export function getMarkLineShowMap(target: IBoundary, current: IBoundary, isRightward: boolean, isDownward: boolean) {
  const allMarkLineShowMap = getAllMarkLineShowMap(target, current);
  // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
  // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示

  const markLineShowMap: IMarkLineShowMap = {
    topX: null,
    centerX: null,
    bottomX: null,
    leftY: null,
    centerY: null,
    rightY: null,
  };
  if(isRightward) {
    if(allMarkLineShowMap.rightY != null) {
      markLineShowMap.rightY = allMarkLineShowMap.rightY;
    } else if (allMarkLineShowMap.centerY != null) {
      markLineShowMap.centerY = allMarkLineShowMap.centerY;
    } else if (allMarkLineShowMap.leftY != null) {
      markLineShowMap.leftY = allMarkLineShowMap.leftY;
    }
  } else {
    if(allMarkLineShowMap.leftY != null) {
      markLineShowMap.leftY = allMarkLineShowMap.leftY;
    } else if (allMarkLineShowMap.centerY != null) {
      markLineShowMap.centerY = allMarkLineShowMap.centerY;
    } else if (allMarkLineShowMap.rightY != null) {
      markLineShowMap.rightY = allMarkLineShowMap.rightY;
    }
    
  }

  if(isDownward) {
    if (allMarkLineShowMap.bottomX != null) {
      markLineShowMap.bottomX = allMarkLineShowMap.bottomX;
    } else if (allMarkLineShowMap.centerX != null) {
      markLineShowMap.centerX = allMarkLineShowMap.centerX;
    } else if(allMarkLineShowMap.topX != null) {
      markLineShowMap.topX = allMarkLineShowMap.topX;
    } 
  } else {
    
    

    if(allMarkLineShowMap.topX != null) {
      markLineShowMap.topX = allMarkLineShowMap.topX;
    } else if (allMarkLineShowMap.centerX != null) {
      markLineShowMap.centerX = allMarkLineShowMap.centerX;
    } else if (allMarkLineShowMap.bottomX != null) {
      markLineShowMap.bottomX = allMarkLineShowMap.bottomX;
    }
  }
  return markLineShowMap;
}