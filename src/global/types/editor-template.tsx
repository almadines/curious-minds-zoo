import {
  EditorElement,
  TextInputEditorElement,
  DropDownSelectEditorElement,
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

export abstract class EditorTemplate {
  abstract fromData: (data: any) => BaseType | undefined;
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
}

export class AnimalEditorTemplate extends EditorTemplate {
  public dataTypeName = Animal.name;

  constructor(public initialAnimal?: Animal) {
    super([
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
        "gender",
        InputFieldType.input,
        true,
        "Gender",
        initialAnimal ? initialAnimal.gender : undefined
      ),
      new TextInputEditorElement(
        "description",
        InputFieldType.textarea,
        false,
        "Description",
        initialAnimal ? initialAnimal.description : undefined
      ),
    ]);
  }

  public fromData = (data: any): Animal | undefined => {
    if (!!data["type"] && !!data["name"] && !!data["gender"]) {
      return new Animal(
        this.initialAnimal ? this.initialAnimal.id : "",
        data["type"],
        data["name"],
        data["gender"],
        data["description"]
      );
    } else {
      console.warn(
        "invalid or incomplete data when attempting to create an animal!"
      );

      return undefined;
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
