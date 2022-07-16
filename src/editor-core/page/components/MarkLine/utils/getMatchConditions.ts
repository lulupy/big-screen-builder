import { IBoundary } from '../interface';

function isNearly(targetValue: number, CurrentValue: number) {
  const diff = 3;
  return Math.abs(CurrentValue - targetValue) <= diff;
};

function getMatchConditions(target: IBoundary, current: IBoundary) {
  const conditions = [
    {
      test: isNearly(current.top, target.top),
      type: 'topX',
      line: target.top,
      drag: target.top,
    },
    {
      test: isNearly(current.bottom, target.top),
      type: 'topX',
      line: target.top,
      drag: target.top - current.height,
    },
    {
      test: isNearly(current.top + current.height / 2, target.top + target.height / 2),
      type: 'centerX',
      line: target.top + target.height / 2 - current.height /2,
      drag: target.top + target.height / 2,
    },
    {
      test: isNearly(current.top, target.bottom),
      type: 'bottomX',
      line: target.bottom,
      drag: target.bottom,
    },
    {
      test: isNearly(current.bottom, target.bottom),
      type: 'bottomX',
      line: target.bottom,
      drag: target.bottom - current.height,
    },
    {
      test: isNearly(current.left, target.left),
      type: 'leftY',
      line: target.left,
      drag: target.left,
    },
    {
      test: isNearly(current.right, target.left),
      type: 'leftY',
      line: target.left,
      drag: target.left - current.width,
    },
    {
      test: isNearly(current.left + current.width / 2, target.left + target.width / 2),
      type: 'centerY',
      line: target.left + target.width / 2 - current.width /2,
      drag: target.left + target.width / 2,
    },
    {
      test: isNearly(current.left, target.right),
      type: 'rightY',
      line: target.right,
      drag: target.right,
    },
    {
      test: isNearly(current.right, target.right),
      type: 'rightY',
      line: target.right - current.width,
      drag: target.right,
    },
  ];
  return conditions;
}

export default getMatchConditions;