import * as React from "react";
import {
  InputField,
  TextInputFieldType,
} from "components/input-fields/text-input-field";

export abstract class CreateElement {
  constructor(
    public identifier: string,
    public type: TextInputFieldType,
    public required: boolean
  ) {}
  public abstract render(
    onInputChange: (newValue: string, identifier: string) => void
  ): JSX.Element;
}

export class TextInputCreateElement extends CreateElement {
  public render(
    onInputChange: (newValue: string, identifier: string) => void
  ): JSX.Element {
    return (
      <InputField
        identifier={this.identifier}
        type={this.type}
        onChange={onInputChange}
        required={this.required}
        key={this.identifier}
      />
    );
  }
}
