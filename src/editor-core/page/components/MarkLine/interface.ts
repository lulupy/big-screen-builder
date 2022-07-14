export type MarkLineType = 'topX' | 'centerX' | 'bottomX' | 'leftY' | 'centerY' | 'rightY';

export interface IMarkLineItem {
  type: MarkLineType,
  line: number,
}


export interface IBoundary {
  top: number,
  bottom: number,
  left: number,
  right: number,
  width: number,
  height: number,
}

export type IMarkLineShowMap  = {
  [key in  MarkLineType]: number | null
}


