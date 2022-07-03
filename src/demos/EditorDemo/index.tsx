import React from 'react';
import { EditorModel, EditorView } from '../../editor';
import editor from './editor';

const EditorDemo = () => {
  return <EditorView editor={editor} />
}

export default React.memo(EditorDemo);
