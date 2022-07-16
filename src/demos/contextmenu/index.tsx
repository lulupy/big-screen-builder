import React from "react";
import {
  ContextMenu as ContextMenuRoot,
  MenuItem as MenuItemRoot,
  ContextMenuTrigger as ContextMenuTriggerRoot,
} from "react-contextmenu";
 
import './react-contextmenu.css';
const ContextMenu: any = ContextMenuRoot;
const MenuItem: any = MenuItemRoot
const ContextMenuTrigger: any = ContextMenuTriggerRoot
 
function MyApp() {
  return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
 
      <ContextMenuTrigger id="same_unique_identifier">
        <div className="well" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'translate(100px, 100px) rotate(30deg)',
        }}>
          Right click to see the menu
        </div>
      </ContextMenuTrigger>
 
      <ContextMenu id="same_unique_identifier">
        <MenuItem data={{foo: 'bar'}}>
          ContextMenu Item 1
        </MenuItem>
        <MenuItem data={{foo: 'bar'}}>
          ContextMenu Item 2
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{foo: 'bar'}}>
          ContextMenu Item 3
        </MenuItem>
      </ContextMenu>
 
    </div>
  );
}

export default MyApp;
