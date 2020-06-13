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

  public clone(): Staff {
    return new Staff(
      this.id,
      this.animalIds,
      this.name,
      this.salary,
      this.description
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
