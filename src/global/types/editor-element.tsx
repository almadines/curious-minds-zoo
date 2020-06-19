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
import ConnectedImageInputField from "components/input-fields/image-input-field";
import { ErrorObject } from "./error-object";

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
    onInputChange?: (newValue: any, identifier: string) => void,
    error?: ErrorObject
  ): JSX.Element {
    const errorMessage = !!error ? error.errorMessage : "";
    return (
      <div key={this.uniqueIdentifier}>
        <div className="editor-element-wrapper">
          <label className="editor-element-label">
            <span className="editor-element-label-value">
              {this.getLabel()}:
            </span>
            <span className="error-message">{errorMessage}</span>
          </label>
          {this.renderInput(editMode, onInputChange, error)}
        </div>
      </div>
    );
  }

  public abstract renderInput(
    editMode: boolean,
    onInputChange: (newValue: string, identifier: string) => void,
    error: ErrorObject
  ): JSX.Element;
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
    editMode: boolean,
    onInputChange: (newValue: string, identifier: string) => void,
    error?: ErrorObject
  ): JSX.Element {
    return (
      <InputField
        editMode={editMode}
        className="editor-element-value"
        identifier={this.identifier}
        type={this.type}
        onChange={onInputChange}
        required={this.required}
        initialValue={this.initialValue}
      />
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
    editMode: boolean,
    onInputChange: (newValue: any, identifier: string) => void,
    error?: ErrorObject
  ): JSX.Element {
    return (
      <DropDownSelect
        className="editor-element-value"
        identifier={this.identifier}
        onChange={onInputChange}
        required={this.required}
        initialValue={this.initialValue}
        selectableOptionsGetter={this.selectableOptionsGetter}
        listElementsWrapper={this.listElementsWrapper}
        editMode={editMode}
      />
    );
  }
}

export class ImageEditorElement extends EditorElement {
  constructor(
    identifier: string,
    required: boolean,
    label: string,
    public initialValue?: string
  ) {
    super(identifier, required, label, initialValue);
  }

  public renderInput(
    editMode: boolean,
    onInputChange: (newValue: any, identifier: string) => void,
    error?: ErrorObject
  ): JSX.Element {
    return (
      <ConnectedImageInputField
        identifier={this.identifier}
        required={this.required}
        onChange={onInputChange}
        editMode={editMode}
        initialValue={this.initialValue}
      />
    );
  }
}
