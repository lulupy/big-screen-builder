import { IEditor } from "./editor";

interface ISerialize {
  serialize: () => any,
}

export interface DeserializeEvent<T extends ISerialize> {
	editor: IEditor;
	data: ReturnType<T['serialize']>;
}