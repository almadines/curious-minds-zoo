import * as React from "react";
import "./enum-input.scss";
import { EnumerationInputOption } from "global/types/enum-input-element";

interface EnumInputProps {
  editMode: boolean;
  className?: string;
  initialValue?: string[];
  identifier: string;
  required?: boolean;
  onChange: (newValue: string[], identifier: string) => void;
  options: EnumerationInputOption[];
  isSingleSelect: boolean;
}

interface EnumInputState {
  value: string[];
}

export class EnumInput extends React.PureComponent<
  EnumInputProps,
  EnumInputState
> {
  constructor(props: EnumInputProps) {
    super(props);
    this.state = { value: props.initialValue || [] };
    this.props.onChange(this.props.initialValue || [], this.props.identifier);
  }

  public inputChanged(enumKey: string, event: Event): void {
    event.stopPropagation();

    let newEnumSet: string[];

    if (this.props.isSingleSelect) {
      newEnumSet = [enumKey];
    } else {
      newEnumSet = [...this.state.value];
      const previouslySelected = this.state.value.includes(enumKey);
      if (previouslySelected) {
        newEnumSet = newEnumSet.filter(
          (value: string): boolean => value !== enumKey
        );
      } else {
        newEnumSet.push(enumKey);
      }
    }

    this.props.onChange(newEnumSet || [], this.props.identifier);
    this.setState({ value: newEnumSet });
  }

  public render(): JSX.Element {
    const inputType = this.props.isSingleSelect ? "radio" : "checkbox";
    return (
      <div className="enum-input-wrapper">
        {this.props.options.map(
          (value: EnumerationInputOption): JSX.Element => {
            const checked = this.state.value.includes(value.key);
            return (
              <div className="form-check" key={value.key}>
                <input
                  className="form-check-input"
                  type={inputType}
                  checked={checked}
                  disabled={!this.props.editMode}
                  onChange={this.inputChanged.bind(this, value.key)}
                />
                <label
                  className="form-check-label"
                  onClick={this.inputChanged.bind(this, value.key)}
                >
                  {value.label}
                </label>
              </div>
            );
          }
        )}
      </div>
    );
  }
}

export default EnumInput;
