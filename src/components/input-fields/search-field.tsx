import * as React from "react";

interface SearchFieldProps {
  initialValue?: string;
  onChange: (newValue: string) => void;
}

interface SearchFieldState {
  searchFilter: string;
}

class SearchField extends React.PureComponent<
  SearchFieldProps,
  SearchFieldState
> {
  constructor(props: SearchFieldProps) {
    super(props);
    this.state = { searchFilter: props.initialValue || "" };
  }

  public searchChanged(event: Event): void {
    event.stopPropagation();
    if (event.target instanceof HTMLInputElement) {
      this.setState({ searchFilter: event.target.value || "" });
    } else {
      console.warn(
        "Event target of searchChanged in SearchField was not an HTMLInputElement: ",
        event.target
      );
    }
  }

  public notifyParent(): void {
    event.stopPropagation();
    this.props.onChange(this.state.searchFilter);
  }

  public render(): JSX.Element {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          value={this.state.searchFilter}
          onChange={this.searchChanged.bind(this)}
          onInput={this.searchChanged.bind(this)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={this.notifyParent.bind(this)}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchField;
