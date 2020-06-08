import { TextInputFieldType } from "components/input-fields/text-input-field";
import { TextInputCreateElement } from "./create-element";
import { BaseType } from "./baseType";
import { EditorTemplate } from "./editor-template";

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
}

export class StaffEditorTemplate extends EditorTemplate {
  public dataTypeName = Staff.name;

  constructor(public initialStaff?: Staff) {
    super([
      new TextInputCreateElement(
        "name",
        TextInputFieldType.input,
        true,
        "Name",
        initialStaff ? initialStaff.name : undefined
      ),
      new TextInputCreateElement(
        "salary",
        TextInputFieldType.input,
        true,
        "Salary",
        initialStaff ? initialStaff.salary : undefined
      ),
      new TextInputCreateElement(
        "description",
        TextInputFieldType.textarea,
        false,
        "Description",
        initialStaff ? initialStaff.description : undefined
      ),
    ]);
  }

  public fromData = (data: any): Staff | undefined => {
    if (!!data["name"]) {
      return new Staff(
        this.initialStaff ? this.initialStaff.id : "",
        data["animalIds"] || [],
        data["name"],
        data["salary"],
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
