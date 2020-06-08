import { BaseType } from "./baseType";

export class Staff extends BaseType {
  constructor(
    public animalIds: string[],
    public name: string,
    public description: string,
    public salary: number
  ) {
    super();
  }
}
