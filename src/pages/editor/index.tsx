import { useNavigate } from 'react-router';
import editor from '../../default/editor';
import {  EditorView } from '../../editor-core';
import template from './template';

const Editor = () => {
  let navigate = useNavigate();

  const handleSave = () => {
    localStorage.setItem('data', JSON.stringify(editor.serializePage(), null ,2));
  };
  const handlePreview = () => {
    handleSave();
    navigate('/preview');
  };

  const handleLoadTemplate = () => {
    editor.deserializePage(template);
    handleSave();
  };


  return (
    <EditorView
      editor={editor}
      onSave={handleSave}
      onPreview={handlePreview}
      onLoadTemplate={handleLoadTemplate}
    />
  )
}

export default Editor;
