import { TextInputFieldType } from "components/input-fields/text-input-field";
import { TextInputEditorElement } from "./create-element";
import { BaseType } from "./baseType";
import { EditorTemplate } from "./editor-template";

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

  public clone(): Exhibit {
    return new Exhibit(
      this.id,
      this.animalIds,
      this.staffIds,
      this.name,
      this.description
    );
  }

  public static getNewEditorTemplate(): ExhibitEditorTemplate {
    return new ExhibitEditorTemplate();
  }

  public getEditorTemplate(): ExhibitEditorTemplate {
    return new ExhibitEditorTemplate(this);
  }
}

export class ExhibitEditorTemplate extends EditorTemplate {
  public dataTypeName = Exhibit.name;

  constructor(public initialExhibit?: Exhibit) {
    super([
      new TextInputEditorElement(
        "name",
        TextInputFieldType.input,
        true,
        "name",
        initialExhibit ? initialExhibit.name : undefined
      ),
      new TextInputEditorElement(
        "description",
        TextInputFieldType.textarea,
        false,
        "description",
        initialExhibit ? initialExhibit.name : undefined
      ),
    ]);
  }

  public fromData = (data: any): Exhibit | undefined => {
    if (!!data["name"]) {
      return new Exhibit(
        this.initialExhibit ? this.initialExhibit.id : "",
        data["animalIds"] || [],
        data["staffIds"] || [],
        data["name"],
        data["description"]
      );
    } else {
      console.warn(
        "invalid or incomplete data when attempting to create an exhibit!"
      );

      return undefined;
    }
  };
}
