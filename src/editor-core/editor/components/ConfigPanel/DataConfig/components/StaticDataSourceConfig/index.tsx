import { Button, Space } from 'antd';
import React from 'react';
import { Collapse } from 'react-collapse';
import JsonEditor from '../../../../../../components/JsonEditor';
import { IItem } from '../../../../../../item';
import EditorWrapper from '../EditorWrapper';
import './index.css';
interface IStaticDataSourceConfigProps {
  item: IItem,
}

// 每次item切换时, 这个组件都会重新创建, 所以不需要考虑item切换的情况
const StaticDataSourceConfig = ({ item } : IStaticDataSourceConfigProps) => {
  const json = item.getDataConfigValue().dataSource.options.json;
  const jsonRef = React.useRef(json);
  const [open, setOpen] = React.useState(false);

  const handleJsonChange = React.useCallback((value: string) => {
    jsonRef.current = value;
  }, []);

  const setDataSource = React.useCallback(() => {
    item.setDataSource({
      type: 'static',
      options: {
        json: jsonRef.current,
      }
    });
    setOpen(false);
  }, [item]);


  return (
    <div className='static-source'>
      <div className='data-config__title'>
        <span>数据源(静态):</span>
        {!open && (
          <Button type="primary" size='small' onClick={() => setOpen(true)}>修改数据</Button>
        )}
      </div>

      <Collapse isOpened={open}>
        <EditorWrapper
          title="输入json数据"
          onCancel={() => setOpen(false)}
          onOk={setDataSource}
        >
          <JsonEditor value={json} onChange={handleJsonChange} />
        </EditorWrapper>
      </Collapse>
    </div>
  )
}

export default React.memo(StaticDataSourceConfig);