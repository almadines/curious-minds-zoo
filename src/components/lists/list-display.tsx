import * as React from "react";
import memoize from "memoize-one";
import { InputField, InputFieldType } from "../input-fields/text-input-field";
import { ListElement, ListElementWrapper } from "global/types/list-element";

interface ListDisplayProps {
  listElementWrapper: ListElementWrapper;
  includeSearchFilter?: boolean;
  tableMode?: boolean;
}

interface ListDisplayState {
  searchFilter: string;
}

class ListDisplay extends React.PureComponent<
  ListDisplayProps,
  ListDisplayState
> {
  constructor(props: any) {
    super(props);
    this.state = { searchFilter: "" };
  }

  public listDisplayFilter = memoize(
    (listElements: ListElement[], searchFilter: string): ListElement[] =>
      listElements.filter((elem: ListElement): boolean => {
        return elem.searchParameter().includes(searchFilter);
      })
  );

  public searchChanged(newValue: string): void {
    this.setState({ searchFilter: newValue });
  }

  public render(): JSX.Element {
    const filteredList = this.listDisplayFilter(
      Array.from(this.props.listElementWrapper.ListElements),
      this.state.searchFilter
    );

    const searchFilter = this.props.includeSearchFilter ? (
      <InputField
        identifier="search"
        type={InputFieldType.input}
        onChange={this.searchChanged.bind(this)}
        editMode={true}
      />
    ) : null;

    if (this.props.tableMode) {
      return (
        <table className="table">
          {this.props.listElementWrapper.renderTableHeader()}
          <tbody>
            {filteredList.map(
              (elem: ListElement): JSX.Element => elem.renderTableRow()
            )}
          </tbody>
        </table>
      );
    }

    return (
      <div>
        {searchFilter}
        <ul className="list-group">
          {filteredList.map(
            (listElement: ListElement): JSX.Element => listElement.render()
          )}
        </ul>
      </div>
    );
  }
}

export default ListDisplay;
