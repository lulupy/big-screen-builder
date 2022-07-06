import React from 'react';
import { Button } from 'antd';
import { PageView } from '../../page';
import { IEditor } from '../IEditor';
import EditorMenu from '../components/EditorMenu';
import ConfigPanel from '../components/ConfigPanel';
import { EditorContext } from '../EditorContext';
import "./index.css";

interface EditorViewProps {
  editor: IEditor,
  onSave: () => void,
  onPreview: () => void,
}

const EidorView = ({ editor, onSave, onPreview }: EditorViewProps) => {
  const components = editor.getComponents();
  const page = editor.getPage();
  if(!page) return null;
  return (
    <EditorContext.Provider value={editor}>
      <div className='eidtor'>
        <div className='editor__header'>
          <Button onClick={onSave}>保存</Button>
          <Button onClick={onPreview}>预览</Button>
          <Button>btn1</Button>
        </div>
        <div className='editor__content'>
          <div className='editor__menu'>
            <EditorMenu components={components}/>
          </div>
          <div className='editor__page'>
            <PageView page={page} />
          </div>
          <div className='editor__config'>
            <ConfigPanel page={page} />
          </div>
        </div>
      </div>

    </EditorContext.Provider>
  );
};

export default React.memo(EidorView);