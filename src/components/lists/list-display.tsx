import * as React from "react";
import memoize from "memoize-one";
import { Animal } from "../../global/types/animals";
import { AppState } from "../../global/state/state";
import SearchField from "../input-fields/search-field";
import { ListElement } from "global/types/list-element";

interface ListDisplayProps {
  listElements: ListElement[];
  includeSearchFilter?: boolean;
}

interface ListDisplayState {
  searchFilter: string;
}

class ListDisplay extends React.PureComponent<
  ListDisplayProps,
  ListDisplayState
> {
  public listDisplayFilter = memoize(
    (listElements: ListElement[], searchFilter: string): ListElement[] =>
      listElements.filter((elem: ListElement): boolean =>
        elem.searchParameter().includes(searchFilter)
      )
  );

  public static mapStateToProps(state: AppState): any {
    return {
      animals: state.animals,
    };
  }

  public searchChanged(newValue: string): void {
    this.setState({ searchFilter: newValue });
  }

  public render(): JSX.Element {
    const filteredList = this.listDisplayFilter(
      Array.from(this.props.listElements.values()),
      this.state.searchFilter
    );

    const searchFilter = this.props.includeSearchFilter ? (
      <SearchField onChange={this.searchChanged.bind(this)} />
    ) : (
      ""
    );

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
