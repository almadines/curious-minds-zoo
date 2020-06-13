import * as React from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import { AppState } from "../../global/state/state";
import ListDisplay from "./list-display";
import { ListElement, ExhibitListElement } from "global/types/list-element";
import { Exhibit } from "global/types/exhibit";
import { isEqual } from "lodash";
import { navigate } from "@reach/router";

interface ExhibitsListPageProps {
  exhibits?: Exhibit[];
  filterByStaffId?: string;
  linkDetailPages?: boolean;
}

class ExhibitsListPage extends React.PureComponent<ExhibitsListPageProps> {
  public getListElements = memoize(
    (exhibits: Exhibit[], linkDetailPages): ListElement[] => {
      const onClickCallbackConstructor = (
        animalId: string
      ): (() => void) => () => {
        navigate(`/exhibit-details?id=${animalId}`);
      };

      return Array.from(exhibits.values()).map(
        (exhibit: Exhibit): ListElement =>
          new ExhibitListElement(
            exhibit,
            linkDetailPages ? onClickCallbackConstructor(exhibit.id) : undefined
          )
      );
    },
    isEqual
  );

  public static mapStateToProps(
    state: AppState,
    ownProps: ExhibitsListPageProps
  ): any {
    let exhibits = Array.from(state.exhibits.values());
    if (ownProps.filterByStaffId) {
      exhibits = exhibits.filter((exhibit: Exhibit): boolean =>
        exhibit.staffIds.includes(ownProps.filterByStaffId)
      );
    }

    exhibits = exhibits.sort((a: Exhibit, b: Exhibit): number =>
      a.name > b.name ? 1 : -1
    );

    return {
      exhibits,
    };
  }

  public render(): JSX.Element {
    const exhibitListElements = this.getListElements(
      this.props.exhibits,
      this.props.linkDetailPages
    );

    return (
      <div>
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
