import { ExhibitListElement } from "global/types/list-element";
import { ListElement } from "global/types/list-element";
import { ExhibitEditorTemplate } from "./editor-template";
import { BaseType } from "./baseType";

export class Exhibit extends BaseType {
  constructor(
    id: string,
    public animalIds: string[],
    public staffIds: string[],
    public name: string,
    public description?: string
  ) {
    super(id);
  }

  public static clone(json: Exhibit): Exhibit {
    return new Exhibit(
      json.id,
      json.animalIds,
      json.staffIds,
      json.name,
      json.description
    );
  }

  public static getNewEditorTemplate(): ExhibitEditorTemplate {
    return new ExhibitEditorTemplate();
  }

  public getEditorTemplate(): ExhibitEditorTemplate {
    return new ExhibitEditorTemplate(this);
  }

  public getListElement(onClickCallback?: () => void): ListElement {
    return new ExhibitListElement(this, onClickCallback);
  }
}
