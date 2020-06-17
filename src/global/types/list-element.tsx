import { Animal } from "./animals";
import * as React from "react";
import { Exhibit } from "./exhibit";
import { Staff } from "./staff";
import { Image } from "./image";

export abstract class ListElementWrapper {
  constructor(public ListElements: ListElement[]) {}

  public abstract renderTableHeader(): JSX.Element;
}

export interface ListElement {
  render: () => JSX.Element;
  renderTableRow: () => JSX.Element;
  searchParameter: () => string;
  onClickCallback?: () => void;
  getId: () => string;
}

export class AnimalListWrapper extends ListElementWrapper {
  constructor(ListElements: AnimalListElement[]) {
    super(ListElements);
  }

  public renderTableHeader(): JSX.Element {
    return (
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Gender</th>
        </tr>
      </thead>
    );
  }
}

export class AnimalListElement {
  constructor(public animal: Animal, public onClickCallback?: () => void) {}

  public renderTableRow(): JSX.Element {
    return (
      <tr key={this.animal.id} onClick={this.onClickCallback}>
        <td>{this.animal.name}</td>
        <td>{this.animal.type}</td>
        <td>{this.animal.gender}</td>
      </tr>
    );
  }

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

export class ExhibitListWrapper extends ListElementWrapper {
  constructor(ListElements: ExhibitListElement[]) {
    super(ListElements);
  }

  public renderTableHeader(): JSX.Element {
    return (
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th># of assigned Animals</th>
          <th># of assigned Staff</th>
        </tr>
      </thead>
    );
  }
}

export class ExhibitListElement {
  constructor(public exhibit: Exhibit, public onClickCallback?: () => void) {}

  public renderTableRow(): JSX.Element {
    return (
      <tr key={this.exhibit.id} onClick={this.onClickCallback}>
        <td>{this.exhibit.name}</td>
        <td>{this.exhibit.animalIds.length}</td>
        <td>{this.exhibit.staffIds.length}</td>
      </tr>
    );
  }
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

export class StaffListWrapper extends ListElementWrapper {
  constructor(ListElements: StaffListElement[]) {
    super(ListElements);
  }

  public renderTableHeader(): JSX.Element {
    return (
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>Salary</th>
          <th># of assigned Animals</th>
        </tr>
      </thead>
    );
  }
}

export class StaffListElement {
  constructor(public staff: Staff, public onClickCallback?: () => void) {}

  public renderTableRow(): JSX.Element {
    return (
      <tr key={this.staff.id} onClick={this.onClickCallback}>
        <td>{this.staff.name}</td>
        <td>{this.staff.salary}</td>
        <td>{this.staff.animalIds.length}</td>
      </tr>
    );
  }
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

export class ImageListWrapper extends ListElementWrapper {
  constructor(listElements: ImageListElement[]) {
    super(listElements);
  }

  public renderTableHeader(): JSX.Element {
    return (
      <thead className="thead-dark">
        <tr>
          <th>Image</th>
        </tr>
      </thead>
    );
  }
}

export class ImageListElement {
  constructor(public image: Image, public onClickCallback?: () => void) {}

  public render(): JSX.Element {
    return (
      <div
        key={this.image.id}
        className="list-group-item"
        onClick={this.onClickCallback}
      >
        {this.image.render()}
      </div>
    );
  }
  public renderTableRow(): JSX.Element {
    return (
      <tr key={this.image.id} onClick={this.onClickCallback}>
        <td>{this.image.render()}</td>
      </tr>
    );
  }
  public searchParameter(): string {
    return this.image.name;
  }
  public getId(): string {
    return this.image.id;
  }
}
