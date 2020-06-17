import * as React from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import { AppState } from "../../global/state/state";
import ListDisplay from "./list-display";
import {
  ExhibitListElement,
  ListElementWrapper,
  ExhibitListWrapper,
} from "global/types/list-element";
import { Exhibit } from "global/types/exhibit";
import { isEqual } from "lodash";
import { navigate } from "@reach/router";
import ConnectedEditPage from "components/edit-page/edit-page";
import "./instance-list-styles.scss";
import { withPrefix } from "gatsby";

interface ExhibitsListPageProps {
  exhibits?: Exhibit[];
  filterByStaffId?: string;
  linkDetailPages?: boolean;
}

interface ExhibitsListPageState {
  createFormOpen: boolean;
}

class ExhibitsListPage extends React.PureComponent<
  ExhibitsListPageProps,
  ExhibitsListPageState
> {
  public getListElementWrapper = memoize(
    (exhibits: Exhibit[], linkDetailPages): ListElementWrapper => {
      const onClickCallbackConstructor = (
        animalId: string
      ): (() => void) => () => {
        navigate(withPrefix(`/exhibit-details?id=${animalId}`));
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

  constructor(props: ExhibitsListPageProps) {
    super(props);
    this.state = { createFormOpen: false };
  }

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

  public setCreateFormOpenState(newState: boolean): void {
    this.setState({ createFormOpen: newState });
  }

  public render(): JSX.Element {
    const exhibitListWrapper = this.getListElementWrapper(
      this.props.exhibits,
      this.props.linkDetailPages
    );

    const createFormContents = !!this.state.createFormOpen ? (
      <div className="instance-list-create-form-container">
        <ConnectedEditPage
          editorTemplate={Exhibit.getNewEditorTemplate()}
          editMode={true}
          onCancelCallback={this.setCreateFormOpenState.bind(this, false)}
          onSuccessCallback={this.setCreateFormOpenState.bind(this, false)}
          title="Create Exhibit"
        />
      </div>
    ) : (
      <button
        className="btn btn-success instance-list-create-button"
        onClick={this.setCreateFormOpenState.bind(this, true)}
      >
        Create Exhibit
      </button>
    );

    return (
      <div className="instance-list-wrapper">
        <div
          className={`instance-list-create-form-wrapper ${
            this.state.createFormOpen
              ? "create-form-open"
              : "create-form-closed"
          }`}
        >
          {createFormContents}
        </div>
        <div className="instance-list-content-wrapper">
          <ListDisplay
            listElementWrapper={exhibitListWrapper}
            includeSearchFilter={true}
            tableMode={true}
          />
        </div>
      </div>
    );
  }
}

const ConnectedExhibitsListPage = connect(ExhibitsListPage.mapStateToProps)(
  ExhibitsListPage
);
export default ConnectedExhibitsListPage;
