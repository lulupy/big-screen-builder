import React from 'react';
import { IComponent } from '../../../component';

interface EditorMenuProps {
  components: IComponent[],
}

const EditorMenu = ({ components } : EditorMenuProps) => {
  const handleAddToPage = React.useCallback((cmpt: IComponent) => {
    cmpt.addToPage({ width: 20, height: 200 }, { x: 0, y: 0 });
  }, []);
  return (
    <div>
      {components.map((cmpt) => (
        <div key={cmpt.name} onClick={handleAddToPage.bind(null, cmpt)}>
          <img src="" alt="" />
          <span>{cmpt.label}</span>
        </div>
      ))}
    </div>
  );
}

export default React.memo(EditorMenu);