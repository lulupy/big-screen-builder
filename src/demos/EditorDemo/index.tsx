import React from 'react';
import {  EditorView, PageModel } from '../../editor';
import editor from './editor';

const page = new PageModel();
editor.setPage(page);

const EditorDemo = () => {
  return <EditorView editor={editor} />
}

export default React.memo(EditorDemo);
