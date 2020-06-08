import * as React from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import { AppState } from "../../global/state/state";
import ListDisplay from "./list-display";
import { ListElement, ExhibitListElement } from "global/types/list-element";
import { Exhibit } from "global/types/exhibit";
import { isEqual } from "lodash";

interface ExhibitsListPageProps {
  exhibits?: Map<string, Exhibit>;
}

class ExhibitsListPage extends React.PureComponent<ExhibitsListPageProps> {
  public getListElements = memoize(
    (exhibits: Map<string, Exhibit>): ListElement[] =>
      Array.from(exhibits.values()).map(
        (exhibit: Exhibit): ListElement => new ExhibitListElement(exhibit)
      ),
    isEqual
  );

  public static mapStateToProps(state: AppState): any {
    return {
      exhibits: state.exhibits,
    };
  }

  public render(): JSX.Element {
    const exhibitListElements = this.getListElements(this.props.exhibits);

    return (
      <div>
        <h1 className="display-1">Exhibits:</h1>
        <ListDisplay
          listElements={exhibitListElements}
          includeSearchFilter={true}
        />
      </div>
    );
  }
}

const ConnectedExhibitsListPage = connect(ExhibitsListPage.mapStateToProps)(
  ExhibitsListPage
);
export default ConnectedExhibitsListPage;
