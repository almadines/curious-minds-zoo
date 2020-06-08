import { Animal } from "./animals";
import * as React from "react";

export interface ListElement {
  render: () => JSX.Element;
  searchParameter: () => string;
}

export class AnimalListElement {
  constructor(public animal: Animal) {}

  public render(): JSX.Element {
    return (
      <div key={this.animal.id} className="list-group-item">
        {this.animal.name} {this.animal.type}
      </div>
    );
  }

  public searchParameter(): string {
    return this.animal.name;
  }
}
