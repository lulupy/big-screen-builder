import { useNavigate } from 'react-router';
import editor from '../../default/editor';
import {  EditorView } from '../../editor-core';

const Editor = () => {
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
