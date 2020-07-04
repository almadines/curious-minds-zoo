import { ListElement } from "./list-element";

export interface DropDownSelectOption {
  getListElement: (onClickCallback?: () => void) => ListElement;
  id: string;
}
