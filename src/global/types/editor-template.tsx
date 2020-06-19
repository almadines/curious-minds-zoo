import {
  EditorElement,
  TextInputEditorElement,
  DropDownSelectEditorElement,
  ImageEditorElement,
} from "./editor-element";
import { BaseType } from "./baseType";
import { Animal } from "./animals";
import { InputFieldType } from "components/input-fields/text-input-field";
import { Exhibit } from "./exhibit";
import { Staff } from "./staff";
import { AppState } from "global/state/state";
import { getNonExhibitAssignedAnimals } from "global/selectors/animal-selectors";
import { DropDownSelectOption } from "./drop-down-select";
import {
  ListElement,
  AnimalListElement,
  AnimalListWrapper,
  ListElementWrapper,
  StaffListElement,
  StaffListWrapper,
} from "./list-element";
import { ErrorObject } from "./error-object";

export abstract class EditorTemplate {
  protected abstract fromData: (data: any) => BaseType | ErrorObject[];
  abstract dataTypeName: string;

  private cachedEditorElements: EditorElement[];

  constructor(EditorElements: EditorElement[]) {
    this.cachedEditorElements = EditorElements.reverse();
  }

  public getEditorElements(): EditorElement[] {
    return this.cachedEditorElements;
  }

  public reset(): void {
    this.cachedEditorElements.forEach((elem: EditorElement): void =>
      elem.reset()
    );
  }

  public convertDataToObject(data: any): BaseType | ErrorObject[] {
    const result = this.fromData(data);

    if (Array.isArray(result) && result.length === 0) {
      result.push(new ErrorObject("global", "Unidentified Error"));
    }

    return result;
  }
}

export class AnimalEditorTemplate extends EditorTemplate {
  public dataTypeName = Animal.name;

  constructor(public initialAnimal?: Animal) {
    super([
      new ImageEditorElement(
        "imgId",
        false,
        "Image",
        initialAnimal ? initialAnimal.imgId : undefined
      ),
      new TextInputEditorElement(
        "type",
        InputFieldType.input,
        true,
        "Type",
        initialAnimal ? initialAnimal.type : undefined
      ),
      new TextInputEditorElement(
        "name",
        InputFieldType.input,
        true,
        "Name",
        initialAnimal ? initialAnimal.name : undefined
      ),
      new TextInputEditorElement(
        "size",
        InputFieldType.input,
        true,
        "Size",
        initialAnimal ? initialAnimal.size : undefined
      ),
      new TextInputEditorElement(
        "description",
        InputFieldType.textarea,
        false,
        "Description",
        initialAnimal ? initialAnimal.description : undefined
      ),
      new TextInputEditorElement(
        "additionalNotes",
        InputFieldType.textarea,
        false,
        "Additional Details",
        initialAnimal ? initialAnimal.description : undefined
      ),
    ]);
  }

  protected fromData = (data: any): Animal | ErrorObject[] => {
    if (!!data["type"] && !!data["name"]) {
      return new Animal(
        this.initialAnimal ? this.initialAnimal.id : "",
        data["type"],
        data["name"],
        data["size"],
        data["description"],
        data["imgId"],
        data["additionalNotes"]
      );
    } else {
      const errorObjects: ErrorObject[] = [];
      if (!data["type"]) {
        errorObjects.push(new ErrorObject("type", "This field is required"));
      }
      if (!data["name"]) {
        errorObjects.push(new ErrorObject("name", "This field is required"));
      }

      return errorObjects;
    }
  };
}

export class ExhibitEditorTemplate extends EditorTemplate {
  public dataTypeName = Exhibit.name;

  constructor(public initialExhibit?: Exhibit) {
    super([
      new TextInputEditorElement(
        "name",
        InputFieldType.input,
        true,
        "Name",
        initialExhibit ? initialExhibit.name : undefined
      ),
      new TextInputEditorElement(
        "description",
        InputFieldType.textarea,
        false,
        "Description",
        initialExhibit ? initialExhibit.name : undefined
      ),
      new DropDownSelectEditorElement(
        "animalIds",
        false,
        "Assigned Animals:",
        (state: AppState): DropDownSelectOption[] => {
          const allNonAssignedAnimals = getNonExhibitAssignedAnimals(state);
          let assignedToExhibit: Animal[] = [];
          if (!!initialExhibit && initialExhibit.animalIds) {
            assignedToExhibit = initialExhibit.animalIds
              .map((id: string): Animal | undefined => state.animals.get(id))
              .filter((animal: Animal): animal is Animal => !!animal);

            if (assignedToExhibit.length !== initialExhibit.animalIds.length) {
              console.warn(
                "some animals assigned to an exhibit could not be matched! ",
                initialExhibit.animalIds,
                assignedToExhibit
              );
            }
          }

          return [...allNonAssignedAnimals, ...assignedToExhibit];
        },
        (listElems: ListElement[]): ListElementWrapper => {
          const animalListElems = listElems.filter(
            (value: ListElement): value is AnimalListElement =>
              value instanceof AnimalListElement
          );

          if (animalListElems.length !== listElems.length) {
            console.warn(
              "Warning! length mismatch when mapping animal list elements for the drop down select!"
            );
          }
          return new AnimalListWrapper(animalListElems);
        },
        initialExhibit ? initialExhibit.animalIds : undefined
      ),
      new DropDownSelectEditorElement(
        "staffIds",
        false,
        "Assigned Staff:",
        (state: AppState) => Array.from(state.staff.values()),
        (listElems: ListElement[]): ListElementWrapper => {
          const staffListElems = listElems.filter(
            (value: ListElement): value is StaffListElement =>
              value instanceof StaffListElement
          );

          if (staffListElems.length !== listElems.length) {
            console.warn(
              "Warning! length mismatch when mapping staff list elements for the drop down select!"
            );
          }
          return new StaffListWrapper(staffListElems);
        },
        initialExhibit ? initialExhibit.staffIds : undefined
      ),
    ]);
  }

  protected fromData = (data: any): Exhibit | ErrorObject[] => {
    if (!!data["name"]) {
      return new Exhibit(
        this.initialExhibit ? this.initialExhibit.id : "",
        data["animalIds"] || [],
        data["staffIds"] || [],
        data["name"],
        data["description"]
      );
    } else {
      const errorObjects: ErrorObject[] = [];
      if (!data["name"]) {
        errorObjects.push(new ErrorObject("name", "This field is required"));
      }

      return errorObjects;
    }
  };
}

export class StaffEditorTemplate extends EditorTemplate {
  public dataTypeName = Staff.name;

  constructor(public initialStaff?: Staff) {
    super([
      new TextInputEditorElement(
        "name",
        InputFieldType.input,
        true,
        "Name",
        initialStaff ? initialStaff.name : undefined
      ),
      new TextInputEditorElement(
        "salary",
        InputFieldType.input,
        true,
        "Salary",
        initialStaff ? initialStaff.salary : undefined
      ),
      new TextInputEditorElement(
        "description",
        InputFieldType.textarea,
        false,
        "Description",
        initialStaff ? initialStaff.description : undefined
      ),
    ]);
  }

  protected fromData = (data: any): Staff | ErrorObject[] => {
    if (!!data["name"]) {
      return new Staff(
        this.initialStaff ? this.initialStaff.id : "",
        data["animalIds"] || [],
        data["name"],
        data["salary"],
        data["description"]
      );
    } else {
      const errorObjects: ErrorObject[] = [];
      if (!data["name"]) {
        errorObjects.push(new ErrorObject("name", "This field is required"));
      }

      return errorObjects;
    }
  };
}
