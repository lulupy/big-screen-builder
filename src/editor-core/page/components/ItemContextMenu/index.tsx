import React from "react";
import {
  ContextMenu as ContextMenuRoot,
  MenuItem as MenuItemRoot,
  ContextMenuTrigger as ContextMenuTriggerRoot,
} from "react-contextmenu";
import { IItem } from "../../../item";
 
import './react-contextmenu.css';
const ContextMenu: any = ContextMenuRoot;
const MenuItem: any = MenuItemRoot
const ContextMenuTrigger: any = ContextMenuTriggerRoot
 

interface IProps {
  item: IItem,
  children: React.ReactNode,
}
function ItemContextMenu({ item, children }: IProps) {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    item.remove();
  }
  const handleUp = (event: React.MouseEvent) => {
    event.stopPropagation();
    item.up();
  }
  const handleDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    item.down();
  }
  const handleTop = (event: React.MouseEvent) => {
    event.stopPropagation();
    item.top();
  }
  const handleBottom = (event: React.MouseEvent) => {
    event.stopPropagation();
    item.bottom();
  }
  return (
    <>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
 
      <ContextMenuTrigger id={`item-contextmenu-${item.id}`}>
        {children}
      </ContextMenuTrigger>
 
      <ContextMenu id={`item-contextmenu-${item.id}`}>
        <MenuItem onClick={handleClick}>
          删除
        </MenuItem>
        <MenuItem onClick={handleTop}>
          置顶
        </MenuItem>
        <MenuItem onClick={handleBottom}>
          置底
        </MenuItem>
        <MenuItem onClick={handleUp}>
          上移
        </MenuItem>
        <MenuItem onClick={handleDown}>
          下移
        </MenuItem>
      </ContextMenu>
 
    </>
  );
}

export default ItemContextMenu;
