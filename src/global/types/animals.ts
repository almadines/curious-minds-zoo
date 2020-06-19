import { AnimalListElement } from "global/types/list-element";
import { ListElement } from "global/types/list-element";
import { BaseType } from "./baseType";
import { AnimalEditorTemplate } from "./editor-template";

export enum AnimalType {
  lion = "lion",
  mouse = "mouse",
  parrot = "parrot",
  antelope = "antelope",
  cheetah = "cheetah",
  elephant = "elephant",
  gorilla = "gorilla",
  tiger = "tiger",
  toucan = "toucan",
  wolf = "wolf",
  zebra = "zebra",
  seagull = "seagull",
}

export class Animal extends BaseType {
  public constructor(
    id: string,
    public type: AnimalType,
    public name: string,
    public size: string,
    public description?: string,
    public imgId?: string,
    public additionalNotes?: string
  ) {
    super(id);
  }

  public static clone(json: Animal): Animal {
    return new Animal(
      json.id,
      json.type,
      json.name,
      json.size,
      json.description,
      json.imgId,
      json.additionalNotes
    );
  }

  public static getNewEditorTemplate(): AnimalEditorTemplate {
    return new AnimalEditorTemplate();
  }

  public getEditorTemplate(): AnimalEditorTemplate {
    console.log("get editor template in animal! ", this);
    return new AnimalEditorTemplate(this);
  }

  public getListElement(onClickCallback?: () => void): ListElement {
    return new AnimalListElement(this, onClickCallback);
  }
}
