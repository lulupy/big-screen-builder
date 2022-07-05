import React from 'react';
import CodeEditor, { ICodeEditorProps } from '../CodeEditor';
import './index.css';

interface IFilterFnEditorProps extends ICodeEditorProps {};

const FilterFnEditor = (props: IFilterFnEditorProps) => {
  return (
    <div className='filter-editor'>
      <div className='filter-editor__fake-code-start'>
        <span style={{ color: '#0000ff' }}>function</span>{` filter(data) {`}
      </div>
      <CodeEditor {...props} style={{ height: 200 }}/>
      <div className='filter-editor__fake-code-end'>{'}'}</div>
    </div>
  );
}

export default React.memo(FilterFnEditor);