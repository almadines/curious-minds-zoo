import { StaffListElement } from "global/types/list-element";
import { ListElement } from "global/types/list-element";
import { StaffEditorTemplate } from "./editor-template";
import { BaseType } from "./baseType";

export class Staff extends BaseType {
  constructor(
    id: string,
    public animalIds: string[],
    public name: string,
    public salary: string,
    public description?: string
  ) {
    super(id);
  }

  public static clone(json: Staff): Staff {
    return new Staff(
      json.id,
      json.animalIds,
      json.name,
      json.salary,
      json.description
    );
  }

  public static getNewEditorTemplate(): StaffEditorTemplate {
    return new StaffEditorTemplate();
  }

  public getEditorTemplate(): StaffEditorTemplate {
    return new StaffEditorTemplate(this);
  }

  public getListElement(onClickCallback?: () => void): ListElement {
    return new StaffListElement(this, onClickCallback);
  }
}
