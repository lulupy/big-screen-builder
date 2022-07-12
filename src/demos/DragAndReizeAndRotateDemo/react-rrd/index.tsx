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
  onDragStart?: RrdDragallback;
  onDrag?: RrdDragallback;
  onDragStop?: RrdDragallback;
  onResizeStart?: RrdResizeStartCallback;
  onResize?: RrdResizeCallback;
  onResizeStop?: RrdResizeStopCallback;
  onRotateStart?: RrdRotateStartCallback;
  onRotate?: RrdRotateCallback;
  onRotateStop?: RrdRotateStopCallback;

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
  const [positionState, setPositionState] = React.useState({x: 100, y: 100});
  const [sizeState, setSizeState] = React.useState({width: 100, height: 100});
  const [rotateState, setRotateState] = React.useState(30);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const [isRotating, setIsRotating] = React.useState(false);
  const box = React.useRef(null);

  const position = (isDragging || isResizing) ? positionState : (props.position || positionState);
  const size = isResizing ? sizeState : (props.size || sizeState);
  const rotate = isRotating ? rotateState : (props.rotate || rotateState);
  return (
    <Draggable
      position={position}
      onStart={(event: RrdDragEvent, data: DraggableData) => {
        props.onDragStart && props.onDragStart(event, data);
        flushSync(() => {
          if(props.position) {
            setPositionState(props.position);
          }
        })
        setIsDragging(true);
      }}
      onDrag={(event: RrdDragEvent, data: DraggableData) => {
        props.onDrag && props.onDrag(event, data);
        setPositionState({
          x: data.x,
          y: data.y,
        });
      }}
      onStop={(event: RrdDragEvent, data: DraggableData) => {
        props.onDragStop && props.onDragStop(event, data);
        setIsDragging(false);
      }}
    >
      <Resizable
        position={position}
        size={size}
        ref={box}
        rotate={rotate}
        onResizeStart={(event, dir) => {
          props.onResizeStart && props.onResizeStart(event, dir);
          flushSync(() => {
            if(props.size) {
              setSizeState(props.size);
            }
            if(props.position) {
              setPositionState(props.position);
            }
          })
          setIsResizing(true);
        }}
        onResize={(event, direction, size, position) => {
          props.onResize && props.onResize(event, direction, size, position);
          setPositionState(position);
          setSizeState(size);
        }}
        onResizeStop={(event, direction, size, position) => {
          props.onResizeStop && props.onResizeStop(event, direction, size, position);
          setIsResizing(false);
        }}
      >
        <RotateControl
          rotate={rotate}
          box={box}
          onRotateStart={(startRotate) => {
            props.onRotateStart && props.onRotateStart(startRotate);
            flushSync(() => {
              if(props.rotate) {
                setRotateState(props.rotate);
              }
            })
            setIsRotating(true);
          }}
          onRotate={(rotate) => {
            props.onRotate && props.onRotate(rotate);
            setRotateState(rotate);
          }}
          onRotateStop={(rotate) => {
            props.onRotateStop && props.onRotateStop(rotate);
            setIsRotating(false);
          }}
          
        />
        {props.children}
      </Resizable>
    </Draggable>
  );
}

export default Rrd;