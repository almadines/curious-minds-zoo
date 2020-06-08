import { BaseType } from "./baseType";

export class Exhibit extends BaseType {
  constructor(
    public animalIds: string[],
    public staffIds: string[],
    public name: string,
    public description?: string
  ) {
    super();
  }

  public static fromData(data: any): Exhibit | undefined {
    if (!!data["name"]) {
      return new Exhibit(
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
  }
}
