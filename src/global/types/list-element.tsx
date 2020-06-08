import { Animal } from "./animals";
import * as React from "react";
import { Exhibit } from "./exhibit";
import { Staff } from "./staff";

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

export class ExhibitListElement {
  constructor(public exhibit: Exhibit) {}

  public render(): JSX.Element {
    return (
      <div key={this.exhibit.id} className="list-group-item">
        {this.exhibit.name} ({this.exhibit.animalIds.length})
      </div>
    );
  }

  public searchParameter(): string {
    return this.exhibit.name;
  }
}

export class StaffListElement {
  constructor(public staff: Staff) {}

  public render(): JSX.Element {
    return (
      <div key={this.staff.id} className="list-group-item">
        {this.staff.name} ({this.staff.animalIds.length})
      </div>
    );
  }

  public searchParameter(): string {
    return this.staff.name;
  }
}
