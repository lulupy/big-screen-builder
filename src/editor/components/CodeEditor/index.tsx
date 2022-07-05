import React from 'react';
import * as monaco from "monaco-editor";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js";

interface IEditorHTMLDivElement extends HTMLDivElement {
  editor: monaco.editor.IStandaloneCodeEditor | null,
}

function createEditor(container: IEditorHTMLDivElement, options: monaco.editor.IStandaloneEditorConstructionOptions | undefined) {
  const editor = monaco.editor.create(container, {
    theme: 'monacoLightTheme',
    value: "",
    language: 'javascript',
    automaticLayout: true,
    // 控制编辑器的换行
    wordWrap: 'on',
    minimap: { enabled: false },
    scrollbar: {
      horizontalScrollbarSize: 5,
      verticalScrollbarSize: 5,
    },
    ...options
  });
  return editor;
}


export interface ICodeEditorProps {
  editorOptions?: monaco.editor.IStandaloneEditorConstructionOptions,
  style?: React.CSSProperties,
  value: string,
  onChange?: (value: string) => void
}
const CodeEditor = ({editorOptions, value, onChange, style, ...other} : ICodeEditorProps) => {
  const container = React.useRef<IEditorHTMLDivElement>(null);
  React.useEffect(() => {
    if(container.current && !container.current.editor) {
      const editor = createEditor(container.current, editorOptions);
      container.current.editor = editor;

      editor.onDidChangeModelContent((event) => {
        onChange && onChange(editor.getValue());
      });
    }
  }, []);
  React.useEffect(() => {
    if(
      container.current
    ) {
      container.current.editor?.setValue(value);
    }
  }, [value]);
  return (
    <div ref={container} style={{ width: '100%', boxSizing: 'border-box', ...style}} {...other}></div>
  );
}

export default CodeEditor;