import React from 'react';
import JsonEditor from '../../../../../../components/JsonEditor';
import StaticDataSource from '../../../../../../DataSource/StaticDataSource';
import { IItem } from '../../../../../../item';

interface IViewDataResultProps {
  item: IItem,
}

const ViewDataResult = ({ item } : IViewDataResultProps) => {
  const [resultData, setResultData] = React.useState<Record<string, unknown>[]>([]);
  const refresh = React.useCallback(async () => {
    const { dataMaps, dataSource, filters } = item.getDataConfigValue();
    console.log(dataMaps, dataSource, filters);
    // todo: 目前是写死的StaticDataSource, 后续会有不同的DataSource, 需要做成可扩展的方式
    const dataSourceInstance =  new StaticDataSource({
      filters,
      dataMaps,
      json: dataSource.options.json,
    });
    const data = await dataSourceInstance.getData();
    setResultData(data);
  }, [item]);

  React.useEffect(() => {
    item.on('dataConfigChange', refresh);
    return () => {
      item.off('dataConfigChange', refresh);
    };
  }, [item, refresh]);
  return (
    <div>
      <div className='data-config__title'>
        <span>数据响应结果{item.id}</span>
      </div>
      <JsonEditor value={JSON.stringify(resultData, null, 2)} readOnly />
    </div>
  );
}

export default React.memo(ViewDataResult);