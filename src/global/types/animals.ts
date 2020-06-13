import { AnimalListElement } from "global/types/list-element";
import { ListElement } from "global/types/list-element";
import { BaseType } from "./baseType";
import { AnimalEditorTemplate } from "./editor-template";

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

  public getListElement(onClickCallback?: () => void): ListElement {
    return new AnimalListElement(this, onClickCallback);
  }
}
