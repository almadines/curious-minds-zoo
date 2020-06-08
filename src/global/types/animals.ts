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
}
