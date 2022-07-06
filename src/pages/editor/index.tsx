import { useNavigate } from 'react-router';
import editor from '../../default/editor';
import {  EditorView, PageModel } from '../../editor-core';

const Editor = () => {
  const data = localStorage.getItem('data');
  if(data) {
    editor.deserializePage(JSON.parse(data))
  } else {
    const page = new PageModel();
    editor.setPage(page);
  }

  let navigate = useNavigate();

  const handleSave = () => {
    localStorage.setItem('data', JSON.stringify(editor.serializePage(), null ,2));
  };
  const handlePreview = () => {
    navigate('/preview');
  };


  return <EditorView editor={editor} onSave={handleSave} onPreview={handlePreview}/>
}

export default Editor;
