import * as React from "react";
import "./text-input-field.scss";

export enum InputFieldType {
  input = "input",
  textarea = "textarea",
}

interface InputFieldProps {
  editMode: boolean;
  className?: string;
  initialValue?: string;
  identifier: string;
  type: InputFieldType;
  required?: boolean;
  onChange: (newValue: string, identifier: string) => void;
}

interface InputFieldState {
  value: string;
}

export class InputField extends React.PureComponent<
  InputFieldProps,
  InputFieldState
> {
  constructor(props: InputFieldProps) {
    super(props);
    this.state = { value: props.initialValue || "" };
    this.props.onChange(this.props.initialValue || "", this.props.identifier);
  }

  public inputChanged(event: Event): void {
    event.stopPropagation();
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      this.setState({ value: event.target.value || "" });
      this.props.onChange(event.target.value, this.props.identifier);
    } else {
      console.warn(
        "Event target of inputChanged in InputField was not an HTMLInputElement: ",
        event.target
      );
    }
  }

  public inputFieldCss(): string {
    const inputType =
      this.props.type === InputFieldType.input
        ? "text-input-field-input"
        : "text-input-field-text-area";
    const isEditing = this.props.editMode
      ? "text-input-is-editing"
      : "text-input-not-editing";
    return `${inputType} ${isEditing}`;
  }

  public inputProps(): any {
    return {
      type: "text",
      className: `form-control ${this.inputFieldCss()}`,
      placeholder: "",
      value: this.state.value,
      onChange: this.inputChanged.bind(this),
      onInput: this.inputChanged.bind(this),
    };
  }

  public render(): JSX.Element {
    if (!this.props.editMode) {
      return (
        <div className={`text-input-field-wrapper ${this.props.className}`}>
          <p className={this.inputFieldCss()}>{this.state.value}</p>
        </div>
      );
    } else {
      let input: JSX.Element = null;
      switch (this.props.type) {
        case InputFieldType.input:
          input = <input {...this.inputProps()} />;
          break;
        case InputFieldType.textarea:
          input = <textarea {...this.inputProps()} />;
          break;
      }

      return (
        <div className={`text-input-field-wrapper ${this.props.className}`}>
          {input}
        </div>
      );
    }
  }
}

export default InputField;
