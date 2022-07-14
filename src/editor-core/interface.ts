import ItemEventBus from "../preview/ItemEventBus";
import { IDataSource } from "./DataSource/AbstractDataSource";
import { IEditor } from "./editor";

interface ISerialize {
  serialize: () => any,
}

export interface DeserializeEvent<T extends ISerialize> {
	editor: IEditor;
	data: ReturnType<T['serialize']>;
}

export interface IComponentProps {
  properties: Record<string, any>,
  dataSource: IDataSource,
  eventBus: ItemEventBus,
}