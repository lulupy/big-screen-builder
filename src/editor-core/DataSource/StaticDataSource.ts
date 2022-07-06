import AbstractDataSource from "./AbstractDataSource";

interface IStaticDataSourceOptions {
  filters: string[];
  dataMaps: Record<string, string>;
  json: string
}

class StaticDataSource extends AbstractDataSource {
  protected json:string;

  constructor({filters, dataMaps, json}: IStaticDataSourceOptions) {
    super(filters, dataMaps);
    this.json = json;
  }

  getOriginData() {
    return JSON.parse(this.json);
  }
}

export default StaticDataSource;