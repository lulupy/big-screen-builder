import React from 'react';
import { IComponent, ComponentView } from '../../../component';

interface EditorMenuProps {
  components: IComponent[],
}

const EditorMenu = ({ components } : EditorMenuProps) => {
  return (
    <div>
      {components.map((cmpt) => (
        <ComponentView component={cmpt} key={cmpt.name} />
      ))}
    </div>
  );
}

export default React.memo(EditorMenu);