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
    console.log(item);
    item.remove();
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
        <MenuItem>
          置顶
        </MenuItem>
        <MenuItem>
          置底
        </MenuItem>
        <MenuItem>
          上移
        </MenuItem>
        <MenuItem>
          下移
        </MenuItem>
      </ContextMenu>
 
    </>
  );
}

export default ItemContextMenu;
