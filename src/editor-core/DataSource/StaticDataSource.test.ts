import StaticDataSource from './StaticDataSource';

describe('StaticDataSource.test', () => {
  it('basic', async () => {
    const filters: string[] = [];
    const dataMaps = {};
    const json = [
      { name: 1 },
    ];
    const dataSouce = new StaticDataSource({ filters, dataMaps, json: JSON.stringify(json, null, 2) });
    expect(await dataSouce.getData()).toEqual([{name: 1}]);
  });

  it('filters', async () => {
    const filters: string[] = [
      `return data.map(item => ({...item, x: parseInt(item.x), y: parseInt(item.y)}))`,
      `return data.map(item => ({...item, x: item.x + 1, y: item.y + 1,}))`,
    ];
    const dataMaps = {};
    const json = [
      { city: '成都', x: '100', y: '100' },
      { city: '北京', x: '200', y: '100' },
    ];
    const dataSouce = new StaticDataSource({ filters, dataMaps, json: JSON.stringify(json, null, 2) });
    expect(await dataSouce.getData()).toEqual([
      { city: '成都', x: 101, y: 101 },
      { city: '北京', x: 201, y: 101 },
    ]);
  });

  it('filters: have error filter fn, will skip the error filter fn', async () => {
    const filters: string[] = [
      `return data.map(item => ({...item, x: parseInt(item.x), y: parseInt(item.y)}))`,
      `throw new Error();`,
    ];
    const dataMaps = {};
    const json = [
      { city: '成都', x: '100', y: '100' },
      { city: '北京', x: '200', y: '100' },
    ];
    const dataSouce = new StaticDataSource({ filters, dataMaps, json: JSON.stringify(json, null, 2) });
    expect(await dataSouce.getData()).toEqual([
      { city: '成都', x: 100, y: 100 },
      { city: '北京', x: 200, y: 100 },
    ]);
  });

  it('dataMaps', async () => {
    const filters: string[] = [
      `return data.map(item => ({...item, x: parseInt(item.x), y: parseInt(item.y)}))`,
      `return data.map(item => ({...item, x: item.x + 1, y: item.y + 1,}))`,
    ];
    const dataMaps = {
      coordinateX: 'x',
      coordinateY: 'y',
    };
    const json = [
      { city: '成都', x: '100', y: '100' },
      { city: '北京', x: '200', y: '100' },
    ];
    const dataSouce = new StaticDataSource({ filters, dataMaps, json: JSON.stringify(json, null, 2) });
    expect(await dataSouce.getData()).toEqual([
      { city: '成都', coordinateX: 101, coordinateY: 101 },
      { city: '北京', coordinateX: 201, coordinateY: 101 },
    ]);
  });


  it('dataMaps have "" item', async () => {
    const filters: string[] = [
      `return data.map(item => ({...item, x: parseInt(item.x), y: parseInt(item.y)}))`,
      `return data.map(item => ({...item, x: item.x + 1, y: item.y + 1,}))`,
    ];
    const dataMaps = {
      coordinateX: 'x',
      coordinateY: '',
    };
    const json = [
      { city: '成都', x: '100', y: '100' },
      { city: '北京', x: '200', y: '100' },
    ];
    const dataSouce = new StaticDataSource({ filters, dataMaps, json: JSON.stringify(json, null, 2) });
    expect(await dataSouce.getData()).toEqual([
      { city: '成都', coordinateX: 101, y: 101 },
      { city: '北京', coordinateX: 201, y: 101 },
    ]);
  });

  it('dataMaps is empty', async () => {
    const filters: string[] = [];
    const dataMaps = {name: '', value: ''};
    const json = [
      { name: '可口', value: '100' },
    ];
    const dataSouce = new StaticDataSource({ filters, dataMaps, json: JSON.stringify(json, null, 2) });
    expect(await dataSouce.getData()).toEqual([
      { name: '可口', value: '100' },
    ]);
  });

  it('dataMaps has the same value with the key', async () => {
    const filters: string[] = [];
    const dataMaps = {name: 'name', value: ''};
    const json = [
      { name: '可口', value: '100' },
    ];
    const dataSouce = new StaticDataSource({ filters, dataMaps, json: JSON.stringify(json, null, 2) });
    expect(await dataSouce.getData()).toEqual([
      { name: '可口', value: '100' },
    ]);
  });
});
