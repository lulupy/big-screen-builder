import React from 'react';
import { flushSync } from 'react-dom';
import { default as DraggableRoot, DraggableEventHandler } from 'react-draggable';
import RotateControl from './RotateControl';
import Resizable from './Resizable';
import type { ResizeStartCallback, ResizeCallback } from './Resizable';
import type { RotateStartCallack, RotateCallack } from './RotateControl';
import "./index.css";

const Draggable: any = DraggableRoot;
export type DraggableData = {
  node: HTMLElement;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
} & Position;

export type RrdDragEvent =
  | React.MouseEvent<HTMLElement | SVGElement>
  | React.TouchEvent<HTMLElement | SVGElement>
  | MouseEvent
  | TouchEvent;

type Rotate = number;

type RrdDragallback = DraggableEventHandler;
type RrdResizeStartCallback = ResizeStartCallback;
type RrdResizeCallback = ResizeCallback;
type RrdResizeStopCallback = ResizeCallback;
type RrdRotateStartCallback = RotateStartCallack;
type RrdRotateCallback = RotateCallack;
type RrdRotateStopCallback = RotateCallack;

interface Props {
  size?: Size,
  position?: Position,
  rotate?: Rotate,
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
  enableResizing?: boolean,
  enableRotate?: boolean,
  onDragStart?: RrdDragallback;
  onDrag?: RrdDragallback;
  onDragStop?: RrdDragallback;
  onResizeStart?: RrdResizeStartCallback;
  onResize?: RrdResizeCallback;
  onResizeStop?: RrdResizeStopCallback;
  onRotateStart?: RrdRotateStartCallback;
  onRotate?: RrdRotateCallback;
  onRotateStop?: RrdRotateStopCallback;
  onClick?: any,

}

export interface Position {
  x: number,
  y: number,
}

export interface Size {
  width:  number;
  height:  number;
}
const Rrd = (props: Props) => {
  const {
    size: sizeProp,
    position: positionProp,
    rotate: rotateProp,
    style,
    className,
    children,
    enableResizing,
    enableRotate,
    onDragStart,
    onDrag,
    onDragStop,
    onResizeStart,
    onResize,
    onResizeStop,
    onRotateStart,
    onRotate,
    onRotateStop,
    ...other
  } = props;
  const [positionState, setPositionState] = React.useState(positionProp || {x: 100, y: 100});
  const [sizeState, setSizeState] = React.useState(sizeProp || {width: 100, height: 100});
  const [rotateState, setRotateState] = React.useState(rotateProp || 0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const [isRotating, setIsRotating] = React.useState(false);
  const box = React.useRef(null);

  const position = (isDragging || isResizing) ? positionState : (positionProp || positionState);
  const size = isResizing ? sizeState : (sizeProp || sizeState);
  const rotate = isRotating ? rotateState : (rotateProp || rotateState);
  return (
    <Draggable
      position={position}
      onStart={(event: RrdDragEvent, data: DraggableData) => {
        onDragStart && onDragStart(event, data);
        flushSync(() => {
          if(positionProp) {
            setPositionState(positionProp);
          }
        })
        setIsDragging(true);
      }}
      onDrag={(event: RrdDragEvent, data: DraggableData) => {
        onDrag && onDrag(event, data);
        setPositionState({
          x: data.x,
          y: data.y,
        });
      }}
      onStop={(event: RrdDragEvent, data: DraggableData) => {
        onDragStop && onDragStop(event, data);
        setIsDragging(false);
      }}
    >
      <Resizable
        {...other}
        className={className}
        style={style}
        position={position}
        size={size}
        ref={box}
        rotate={rotate}
        enable={enableResizing}
        onResizeStart={(event, dir) => {
          onResizeStart && onResizeStart(event, dir);
          flushSync(() => {
            if(sizeProp) {
              setSizeState(sizeProp);
            }
            if(positionProp) {
              setPositionState(positionProp);
            }
          })
          setIsResizing(true);
        }}
        onResize={(event, direction, size, position) => {
          onResize && onResize(event, direction, size, position);
          setPositionState(position);
          setSizeState(size);
        }}
        onResizeStop={(event, direction, size, position) => {
          onResizeStop && onResizeStop(event, direction, size, position);
          setIsResizing(false);
        }}
      >
        <RotateControl
          enable={enableRotate}
          rotate={rotate}
          box={box}
          onRotateStart={(startRotate) => {
            onRotateStart && onRotateStart(startRotate);
            flushSync(() => {
              if(rotateProp) {
                setRotateState(rotateProp);
              }
            })
            setIsRotating(true);
          }}
          onRotate={(rotate) => {
            onRotate && onRotate(rotate);
            setRotateState(rotate);
          }}
          onRotateStop={(rotate) => {
            onRotateStop && onRotateStop(rotate);
            setIsRotating(false);
          }}
          
        />
        {children}
      </Resizable>
    </Draggable>
  );
}

export default Rrd;