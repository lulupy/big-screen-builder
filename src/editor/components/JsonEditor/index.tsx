import React from 'react';
import CodeEditor, { ICodeEditorProps } from '../CodeEditor';
import './index.css';

interface IJsonEditorProps extends ICodeEditorProps {
  readOnly?: boolean,
};

const JsonEditor = (props: IJsonEditorProps) => {
  const { readOnly, ...other } = props;
  return (
    <div className='json-editor'>
      <CodeEditor {...other} style={{ height: 200 }} editorOptions={{ language: 'json', readOnly }}/>
    </div>
  );
}

export default React.memo(JsonEditor);