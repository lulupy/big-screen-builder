import React from 'react';
import classNames from 'classnames';
import { RightOutlined } from '@ant-design/icons';

import { Collapse } from 'react-collapse';
import FilterFnEditor from '../../../../../../../components/FilterFnEditor';
import EditorWrapper from '../../EditorWrapper';
import './index.css';

interface IFilterItemProps {
  name: string,
  filter: string,
  onOk: (code: string) => void,
  onRemove: () => void,
}
const FilterItem = ({name, filter, onOk, onRemove} : IFilterItemProps) => {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState(filter);
  const codeRef = React.useRef<string>(code);

  const handleCodeChange = React.useCallback((value: string) => {
    codeRef.current = value;
  }, []);

  const handleOk = React.useCallback(() => {
    onOk && onOk(codeRef.current);
    setOpen(false);
  }, [onOk]);


  React.useEffect(() => {
    setCode(filter);
  }, [filter]);

  return (
    <div className='filter-item'>
      <div className={classNames('filter-item__item', {
        'is-open': open,
      })}>
        <span className='filter-item__name'>{name}</span>
        <span className='filter-item__remove' onClick={onRemove}>删除</span>
        <RightOutlined className='filter-item__toggle-btn' onClick={() => setOpen(!open)}/>
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
    </div>
  );
}

export default FilterItem;