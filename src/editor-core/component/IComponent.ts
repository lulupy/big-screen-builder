import { Component, FC } from "react";
import { IPage } from "../page";
import { IPosition, ISize } from "../page/IPage";

import { FormRule } from 'antd';
import { IDataSource } from "../DataSource/AbstractDataSource";

export interface IProperty {
  type: string,
  name: string,
  label: string,
  rules?: FormRule[],
  inputProps?: { [key: string] : unknown },
}

// 事件声明接口
export interface IEventDeclaration {
  name: string,
  label: string,
  description?: string,
}

// 动作声明接口
export interface IActionDeclaration {
  name: string,
  label: string,
  description?: string,
}

export interface DataFieldDeclaration {
  name: string,
}

export interface ComponentProps{
  properties: { [key: string]: string }
  dataSource: IDataSource,
}
export interface IComponent {
  name: string,
  label: string,
  icon?: string,
  Component: React.ElementType,
  ViewComponent: React.ElementType,
  properties: IProperty[],
  events: IEventDeclaration[],
  actions: IActionDeclaration[],
  dataFields: DataFieldDeclaration[],
  setPage: (page: IPage | null) => void;
  getPage: () => IPage,
  addToPage: (size: ISize, position: IPosition) => void;
}