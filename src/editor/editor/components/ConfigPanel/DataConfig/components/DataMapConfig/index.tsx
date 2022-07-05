import React from 'react';
import { Table } from 'antd';
import Input from '../../../../../../components/Input';
import { IItem } from '../../../../../../item';



interface IDataMapConfigProps {
  item: IItem,
}
const DataMapConfig = ({ item } : IDataMapConfigProps) => {
  const { dataFields } = item.component;
  const [dataMaps, setDataMaps] = React.useState(item.getDataConfigValue().dataMaps);

  React.useEffect(() => {
    setDataMaps(item.getDataConfigValue().dataMaps);
  }, [item]);
  const columns = [
    {dataIndex: 'name', title: '字段', width: 60 },
    {dataIndex: 'name', title: '映射', render: (key: string) => {
      return (
        <Input
          defaultValue={dataMaps[key]}
          onBlur={(event) => {
            const { value } = event.target;
            item.setDataMap(key, value);
          }}
        />
      );
    }},
    {dataIndex: 'description', title: '描述', width: 60 },
  ];
  const data = dataFields.map(field => ({ ...field }));
  return (
    <>
      <div className='data-config__title'>
        <span>数据映射：</span>
      </div>
      <Table rowKey="name" pagination={false} columns={columns} dataSource={data} />
    </>
  );
}

export default React.memo(DataMapConfig);