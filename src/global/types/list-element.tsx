import { Animal } from "./animals";
import * as React from "react";
import { Exhibit } from "./exhibit";
import { Staff } from "./staff";

export interface ListElement {
  render: () => JSX.Element;
  searchParameter: () => string;
  onClickCallback?: () => void;
  getId: () => string;
}

export class AnimalListElement {
  constructor(public animal: Animal, public onClickCallback?: () => void) {}

  public render(): JSX.Element {
    return (
      <div
        key={this.animal.id}
        className="list-group-item"
        onClick={this.onClickCallback}
      >
        {this.animal.name} {this.animal.type}
      </div>
    );
  }

  public searchParameter(): string {
    return this.animal.name;
  }

  public getId(): string {
    return this.animal.id;
  }
}

export class ExhibitListElement {
  constructor(public exhibit: Exhibit, public onClickCallback?: () => void) {}

  public render(): JSX.Element {
    return (
      <div
        key={this.exhibit.id}
        className="list-group-item"
        onClick={this.onClickCallback}
      >
        {this.exhibit.name} ({this.exhibit.animalIds.length})
      </div>
    );
  }

  public searchParameter(): string {
    return this.exhibit.name;
  }

  public getId(): string {
    return this.exhibit.id;
  }
}

export class StaffListElement {
  constructor(public staff: Staff, public onClickCallback?: () => void) {}

  public render(): JSX.Element {
    return (
      <div
        key={this.staff.id}
        className="list-group-item"
        onClick={this.onClickCallback}
      >
        {this.staff.name} ({this.staff.animalIds.length})
      </div>
    );
  }

  public searchParameter(): string {
    return this.staff.name;
  }

  public getId(): string {
    return this.staff.id;
  }
}
