import * as React from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import { AppState } from "../../global/state/state";
import ListDisplay from "./list-display";
import {
  ListElement,
  ExhibitListElement,
  ListElementWrapper,
  ExhibitListWrapper,
} from "global/types/list-element";
import { Exhibit } from "global/types/exhibit";
import { isEqual } from "lodash";
import { navigate } from "@reach/router";

interface ExhibitsListPageProps {
  exhibits?: Exhibit[];
  filterByStaffId?: string;
  linkDetailPages?: boolean;
}

class ExhibitsListPage extends React.PureComponent<ExhibitsListPageProps> {
  public getListElementWrapper = memoize(
    (exhibits: Exhibit[], linkDetailPages): ListElementWrapper => {
      const onClickCallbackConstructor = (
        animalId: string
      ): (() => void) => () => {
        navigate(`/exhibit-details?id=${animalId}`);
      };

      const listElems = Array.from(exhibits.values()).map(
        (exhibit: Exhibit): ExhibitListElement =>
          new ExhibitListElement(
            exhibit,
            linkDetailPages ? onClickCallbackConstructor(exhibit.id) : undefined
          )
      );

      return new ExhibitListWrapper(listElems);
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
    const exhibitListWrapper = this.getListElementWrapper(
      this.props.exhibits,
      this.props.linkDetailPages
    );

    return (
      <div>
        <ListDisplay
          listElementWrapper={exhibitListWrapper}
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
