import { v4 as uuidv4 } from "uuid";

export abstract class BaseType {
  constructor(public id: string) {
    this.id = this.id || uuidv4(); // not too sure about this but let's see how it goes :)
  }
}
