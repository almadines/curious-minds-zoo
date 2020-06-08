import { BaseType } from "./baseType";

export class Exhibit extends BaseType {
  constructor(
    public animalIds: string[],
    public staffIds: string[],
    public name: string,
    public description: string
  ) {
    super();
  }
}
