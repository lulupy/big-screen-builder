export interface IDataSource {
  getData: () => Promise<Record<string, unknown>[]>;
}

abstract class AbstractDataSource implements IDataSource {
  protected filters: string[];
  protected dataMaps: Record<string, string>;
  constructor(filters: string[], dataMaps: Record<string, string>) {
    this.filters = filters;
    this.dataMaps = dataMaps;
  }
  abstract getOriginData() : Record<string, unknown>[];
  async getData(){
    const originData = await this.getOriginData();

    const data = this.filters.reduce((data, filterString) => {
      try{
        const filterFn = this.createFilterFn(filterString);
        return filterFn(data);
      } catch {
        return data;
      }
    }, originData);

    if(Object.keys(this.dataMaps).length === 0) {
      return data;
    }

    data.forEach(record => {
      // const newRecord: Record<string, unknown> = {};
      Object.entries(this.dataMaps).forEach(([key, keyMap]: [string, string]) => {
        if(keyMap && key !== keyMap) {
          record[key] = record[keyMap];
          delete record[keyMap];

        }
        
      })
      // return newRecord;
    })

    return data;

  }
  createFilterFn(filterString: string) {
    // eslint-disable-next-line no-new-func
    return new Function('data', filterString);
  }
}

export default AbstractDataSource;