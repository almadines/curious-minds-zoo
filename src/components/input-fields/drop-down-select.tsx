import * as React from "react";
import { DropDownSelectOption } from "global/types/drop-down-select";
import ListDisplay from "components/lists/list-display";
import memoizeOne from "memoize-one";
import { ListElement, ListElementWrapper } from "global/types/list-element";
import { AppState } from "global/state/state";
import { connect } from "react-redux";
import "./drop-down-select.scss";
import { ErrorObject } from "global/types/error-object";

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
  className?: string;
  initialValue?: string[];
  required?: boolean;
  // from redux:
  selectableOptions?: DropDownSelectOption[];
}

interface DropDownSelectState {
  selectedOptions: string[];
  optionsMenuExpanded: boolean;
}

class DropDownSelect extends React.PureComponent<
  DropDownSelectProps,
  DropDownSelectState
> {
  private windowClickListener: () => void;

  constructor(props: DropDownSelectProps) {
    super(props);
    this.state = {
      selectedOptions: props.initialValue || [],
      optionsMenuExpanded: false,
    };
    this.props.onChange(this.props.initialValue || [], this.props.identifier);
    this.windowClickListener = (): void => {
      this.setOptionsMenuState(false);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("click", this.windowClickListener);
    }
  }

  public componentWillUnmount(): void {
    if (typeof window !== "undefined") {
      window.removeEventListener("click", this.windowClickListener);
    }
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

    this.setOptionsMenuState(false);
  }

  public setOptionsMenuState(newValue: boolean) {
    this.setState({ optionsMenuExpanded: newValue });
  }

  public toggleOptionsMenuState(event: Event): void {
    event.stopPropagation();
    this.setOptionsMenuState(!this.state.optionsMenuExpanded);
  }

  public render(): JSX.Element {
    const selectedElements = this.getDisplayListElements(
      this.state.selectedOptions
    );
    const nonSelectedElements = this.nonSelectedElements(
      this.state.selectedOptions
    );

    const menuExpandedCss = this.state.optionsMenuExpanded ? "" : "hidden";
    const addButtonDisabled = nonSelectedElements.ListElements.length === 0;
    const inputSelector = this.props.editMode ? (
      <div className="drop-down-select-selector">
        <button
          className={`btn ${
            addButtonDisabled ? "btd-secondary" : "btn-success"
          }`}
          onClick={this.toggleOptionsMenuState.bind(this)}
        >
          <i className="material-icons layout-link-icon">add</i> Add
        </button>
        <div
          className={`drop-down-select-selector-contents ${menuExpandedCss}`}
        >
          <ListDisplay listElementWrapper={nonSelectedElements} />
        </div>
      </div>
    ) : null;

    return (
      <div className={`drop-down-select-wraper ${this.props.className}`}>
        <div className="drop-down-select-header">{inputSelector}</div>
        <div className="drop-down-select-display">
          <ListDisplay listElementWrapper={selectedElements} tableMode={true} />
        </div>
      </div>
    );
  }
}

const ConnectedDropDownSelect = connect(DropDownSelect.mapStateToProps)(
  DropDownSelect
);

export default ConnectedDropDownSelect;
