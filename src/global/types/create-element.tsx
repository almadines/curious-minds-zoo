import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  InputField,
  TextInputFieldType,
} from "components/input-fields/text-input-field";

export abstract class EditorElement {
  public uniqueIdentifier: string = "";
  constructor(
    public identifier: string,
    public type: TextInputFieldType,
    public required: boolean,
    public label?: string,
    public initialValue?: string | string[]
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
    onInputChange?: (newValue: string, identifier: string) => void
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
    type: TextInputFieldType,
    required: boolean,
    label?: string,
    public initialValue?: string
  ) {
    super(identifier, type, required, label, initialValue);
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
        <label>{this.getLabel()}</label>
        <span>{this.initialValue}</span>
      </div>
    );
  }
}
