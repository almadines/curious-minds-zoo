import * as React from "react";
import { DropDownSelectOption } from "global/types/drop-down-select";
import ListDisplay from "components/lists/list-display";
import memoizeOne from "memoize-one";
import { ListElement, ListElementWrapper } from "global/types/list-element";
import { AppState } from "global/state/state";
import { connect } from "react-redux";
import styled from "styled-components";

const DividerDiv = styled.div`
  margin: 1rem;
  border-top: 5px solid red;
`;

enum DropDownModifyOperation {
  add = "add",
  remove = "remove",
}

interface DropDownSelectProps {
  identifier: string;
  selectableOptionsGetter: (state: AppState) => DropDownSelectOption[];
  listElementsWrapper: (listElems: ListElement[]) => ListElementWrapper; // not ideal since it adds complexity but i'll need to clean it up later
  onChange: (newValue: string[], identifier: string) => void;
  editMode: boolean;
  initialValue?: string[];
  required?: boolean;
  // from redux:
  selectableOptions?: DropDownSelectOption[];
}

interface DropDownSelectState {
  selectedOptions: string[];
}

class DropDownSelect extends React.PureComponent<
  DropDownSelectProps,
  DropDownSelectState
> {
  constructor(props: DropDownSelectProps) {
    super(props);
    this.state = { selectedOptions: props.initialValue || [] };
    this.props.onChange(this.props.initialValue || [], this.props.identifier);
  }

  public getDisplayListElements = memoizeOne(
    (value: string[]): ListElementWrapper => {
      const listElems = this.props.selectableOptions
        .filter((option: DropDownSelectOption): boolean =>
          value.includes(option.id)
        )
        .map(
          (option: DropDownSelectOption): ListElement =>
            option.getListElement(
              this.inputChanged.bind(
                this,
                option.id,
                DropDownModifyOperation.remove
              )
            )
        );
      return this.props.listElementsWrapper(listElems);
    }
  );

  public nonSelectedElements = memoizeOne(
    (value: string[]): ListElementWrapper => {
      const listElems = this.props.selectableOptions
        .filter(
          (option: DropDownSelectOption): boolean => !value.includes(option.id)
        )
        .map(
          (option: DropDownSelectOption): ListElement =>
            option.getListElement(
              this.inputChanged.bind(
                this,
                option.id,
                DropDownModifyOperation.add
              )
            )
        );
      return this.props.listElementsWrapper(listElems);
    }
  );

  public static mapStateToProps(
    state: AppState,
    ownProps: DropDownSelectProps
  ): any {
    return { selectableOptions: ownProps.selectableOptionsGetter(state) };
  }

  public inputChanged(id: string, operation: DropDownModifyOperation): void {
    if (!this.props.editMode) {
      return;
    }

    let selectedOptions = [...this.state.selectedOptions];
    switch (operation) {
      case DropDownModifyOperation.add:
        selectedOptions = [...selectedOptions, id];
        break;
      case DropDownModifyOperation.remove:
        selectedOptions = selectedOptions.filter(
          (value: string): boolean => value !== id
        );
        break;
    }

    if (selectedOptions.length !== this.state.selectedOptions.length) {
      this.setState({ selectedOptions: selectedOptions });
      this.props.onChange(selectedOptions, this.props.identifier);
    } else {
      console.warn(
        "Operation: ",
        operation,
        " with id: ",
        id,
        " had no effect on the drop down select current state: ",
        this.state.selectedOptions,
        " ignoring input for drop down select with id: ",
        this.props.identifier
      );
    }
  }

  public render(): JSX.Element {
    const selectedElements = this.getDisplayListElements(
      this.state.selectedOptions
    );
    const nonSelectedElements = this.nonSelectedElements(
      this.state.selectedOptions
    );

    const inputSelector = this.props.editMode ? (
      <div className="drop-down-select-selector">
        <ListDisplay listElementWrapper={nonSelectedElements} />
      </div>
    ) : null;

    return (
      <div className="drop-down-select-wraper">
        {inputSelector}
        <DividerDiv />
        <div className="drop-down-select-display">
          <ListDisplay listElementWrapper={selectedElements} />
        </div>
      </div>
    );
  }
}

const ConnectedDropDownSelect = connect(DropDownSelect.mapStateToProps)(
  DropDownSelect
);

export default ConnectedDropDownSelect;
