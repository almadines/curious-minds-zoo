import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  InputField,
  TextInputFieldType,
} from "components/input-fields/text-input-field";

export abstract class CreateElement {
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

  public render(
    onInputChange: (newValue: string, identifier: string) => void
  ): JSX.Element {
    return (
      <div key={this.uniqueIdentifier}>{this.renderInput(onInputChange)}</div>
    );
  }

  public abstract renderInput(
    onInputChange: (newValue: string, identifier: string) => void
  ): JSX.Element;
}

export class TextInputCreateElement extends CreateElement {
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
        <label>{this.label || this.identifier}</label>
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
}
