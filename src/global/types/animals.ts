import { TextInputFieldType } from "components/input-fields/text-input-field";
import { TextInputCreateElement } from "./create-element";
import { BaseType } from "./baseType";
import { EditorTemplate } from "./editor-template";

export enum AnimalType {
  lion = "lion",
  cat = "cat",
  dog = "dog",
  mouse = "mouse",
  bird = "bird",
}

export class Animal extends BaseType {
  public constructor(
    id: string,
    public type: AnimalType,
    public name: string,
    public gender: string,
    public description?: string
  ) {
    super(id);
  }

  public clone(): Animal {
    return new Animal(
      this.id,
      this.type,
      this.name,
      this.gender,
      this.description
    );
  }

  public static getNewEditorTemplate(): AnimalEditorTemplate {
    return new AnimalEditorTemplate();
  }

  public getEditorTemplate(): AnimalEditorTemplate {
    return new AnimalEditorTemplate(this);
  }
}

export class AnimalEditorTemplate extends EditorTemplate {
  public dataTypeName = Animal.name;

  constructor(public initialAnimal?: Animal) {
    super([
      new TextInputCreateElement(
        "type",
        TextInputFieldType.input,
        true,
        initialAnimal ? initialAnimal.type : undefined
      ),
      new TextInputCreateElement(
        "name",
        TextInputFieldType.input,
        true,
        initialAnimal ? initialAnimal.name : undefined
      ),
      new TextInputCreateElement(
        "gender",
        TextInputFieldType.input,
        true,
        initialAnimal ? initialAnimal.gender : undefined
      ),
      new TextInputCreateElement(
        "description",
        TextInputFieldType.textarea,
        false,
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
