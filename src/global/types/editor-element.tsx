import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  InputField,
  InputFieldType,
} from "components/input-fields/text-input-field";
import { DropDownSelectOption } from "./drop-down-select";
import DropDownSelect from "components/input-fields/drop-down-select";
import { AppState } from "global/state/state";
import { ListElement, ListElementWrapper } from "./list-element";

export abstract class EditorElement {
  public uniqueIdentifier: string = "";
  constructor(
    public identifier: string,
    public required: boolean,
    public label: string,
    public initialValue?: any
  ) {
    this.uniqueIdentifier = this.identifier + uuidv4();
  }

  public reset(): void {
    this.uniqueIdentifier = this.identifier + uuidv4();
  }

  public getLabel(): string {
    return this.label || this.identifier;
  }

  public render(
    editMode: boolean,
    onInputChange?: (newValue: any, identifier: string) => void
  ): JSX.Element {
    if (editMode && onInputChange) {
      return (
        <div key={this.uniqueIdentifier}>{this.renderInput(onInputChange)}</div>
      );
    } else {
      return <div key={this.uniqueIdentifier}>{this.renderDisplay()}</div>;
    }
  }

  public abstract renderInput(
    onInputChange: (newValue: string, identifier: string) => void
  ): JSX.Element;

  public abstract renderDisplay(): JSX.Element;
}

export class TextInputEditorElement extends EditorElement {
  constructor(
    identifier: string,
    public type: InputFieldType,
    required: boolean,
    label: string,
    public initialValue?: string
  ) {
    super(identifier, required, label, initialValue);
  }

  public renderInput(
    onInputChange: (newValue: string, identifier: string) => void
  ): JSX.Element {
    return (
      <div>
        <label>{this.getLabel()}</label>
        <InputField
          identifier={this.identifier}
          type={this.type}
          onChange={onInputChange}
          required={this.required}
          initialValue={this.initialValue}
        />
      </div>
    );
  }

  public renderDisplay(): JSX.Element {
    return (
      <div>
        <label>{this.getLabel()}: </label>
        <span>{this.initialValue}</span>
      </div>
    );
  }
}

export class DropDownSelectEditorElement extends EditorElement {
  constructor(
    identifier: string,
    required: boolean,
    label: string,
    public selectableOptionsGetter: (state: AppState) => DropDownSelectOption[], // may be a mistake but whatever
    public listElementsWrapper: (listElem: ListElement[]) => ListElementWrapper, // is actually a mistake but stuff needs to get done.
    public initialValue?: string[]
  ) {
    super(identifier, required, label, initialValue);
  }

  public renderInput(
    onInputChange: (newValue: any, identifier: string) => void
  ): JSX.Element {
    return (
      <div>
        <label>{this.getLabel()}</label>
        <DropDownSelect
          identifier={this.identifier}
          onChange={onInputChange}
          required={this.required}
          initialValue={this.initialValue}
          selectableOptionsGetter={this.selectableOptionsGetter}
          listElementsWrapper={this.listElementsWrapper}
          editMode={true}
        />
      </div>
    );
  }

  public renderDisplay(): JSX.Element {
    return (
      <div>
        <label>{this.getLabel()}</label>
        <DropDownSelect
          identifier={this.identifier}
          onChange={() => null}
          required={this.required}
          initialValue={this.initialValue}
          selectableOptionsGetter={this.selectableOptionsGetter}
          listElementsWrapper={this.listElementsWrapper}
          editMode={false}
        />
      </div>
    );
  }
}
