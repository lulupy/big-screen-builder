import { Button, Space } from 'antd';
import React from 'react';
import './index.css';

interface IEditorWrapperProps {
  header?: React.ReactElement | null,
  title?: React.ReactElement | string,
  onOk?: () => void,
  onCancel?: () => void,
  children: React.ReactElement,
}

const EditorWrapper = ({title, onOk, onCancel, children, header} : IEditorWrapperProps) => {
  const handleOk = () => {
    onOk && onOk();
  }

  const handleCancel = () => {
    onCancel && onCancel();
  }
  return (
    <div className='editor-wrapper'>
      {header === undefined ? (
        <div className='editor-wrapper__header'>{title}</div>
      ) : header}
      {children}
      <div className='editor-wrapper__footer'>
        <Space>
          <Button size="small" onClick={handleCancel}>
            取消
          </Button>
          <Button size="small" type='primary' onClick={handleOk}>
            保存
          </Button>
        </Space>

          </div>
    </div>
  );
}

export default React.memo(EditorWrapper);