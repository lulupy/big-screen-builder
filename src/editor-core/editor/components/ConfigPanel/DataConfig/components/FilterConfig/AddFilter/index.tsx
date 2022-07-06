import { PlusOutlined } from '@ant-design/icons';
import { Collapse } from 'react-collapse';
import React from 'react';
import FilterFnEditor from '../../../../../../../components/FilterFnEditor';
import './index.css';
import EditorWrapper from '../../EditorWrapper';

const defaultCode = `return data;`;

interface IAddFilterProps {
  onOk?: (value: string) => void,
}
const AddFilter = ({ onOk } : IAddFilterProps) => {
  const [code] = React.useState(defaultCode);
  const codeRef = React.useRef<string>(code);
  const [open, setOpen] = React.useState(false);

  const handleCodeChange = React.useCallback((value: string) => {
    codeRef.current = value;
  }, []);

  const handleOk = React.useCallback(() => {
    onOk && onOk(codeRef.current);
    setOpen(false);
  }, [onOk]);
  return (
    <>
      <div className='add-filter__add'>
        <PlusOutlined className='add-filter__add-icon' onClick={() => setOpen(true)}/>
      </div>
      <Collapse isOpened={open}>
        <EditorWrapper
          header={null}
          onOk={handleOk}
          onCancel={() => setOpen(false)}
        >
          <FilterFnEditor value={code} onChange={handleCodeChange}/>
        </EditorWrapper>
      </Collapse>
    </>
  );
}

export default React.memo(AddFilter);