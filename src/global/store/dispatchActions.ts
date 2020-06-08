import { ValueType } from "./../state/state";
export interface DispatchAction {
  type: ActionType;
  values: ValueType[];
  names: string[];
}

export enum ActionType {
  add = "add",
  remove = "remove",
  upsert = "upsert",
}

export interface IdObject {
  id: string;
}
