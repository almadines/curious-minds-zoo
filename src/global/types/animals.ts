import { BaseType } from "./baseType";

export enum AnimalType {
  lion = "lion",
  cat = "cat",
  dog = "dog",
  mouse = "mouse",
  bird = "bird",
}

export class Animal extends BaseType {
  public id: string;
  public constructor(
    public type: AnimalType,
    public name: string,
    public gender: string,
    public description?: string
  ) {
    super();
  }

  public static fromData(data: any): Animal | undefined {
    if (!!data["type"] && !!data["name"] && !!data["gender"]) {
      return new Animal(
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
  }
}
