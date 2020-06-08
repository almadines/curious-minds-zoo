import { BaseType } from "./baseType";

export class Staff extends BaseType {
  constructor(
    public animalIds: string[],
    public name: string,
    public salary: number,
    public description?: string
  ) {
    super();
  }

  public static fromData(data: any): Staff | undefined {
    if (!!data["name"] && !!data["salary"]) {
      return new Staff(
        data["animalIds"] || [],
        data["name"],
        data["description"],
        data["salary"]
      );
    } else {
      console.warn(
        "invalid or incomplete data when attempting to create an exhibit!"
      );

      return undefined;
    }
  }
}
