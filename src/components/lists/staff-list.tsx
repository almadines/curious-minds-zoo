import * as React from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import { AppState } from "../../global/state/state";
import ListDisplay from "./list-display";
import {
  StaffListElement,
  ListElementWrapper,
  StaffListWrapper,
} from "global/types/list-element";
import { isEqual } from "lodash";
import { Staff } from "global/types/staff";
import { navigate } from "@reach/router";
import "./instance-list-styles.scss";
import ConnectedEditPage from "components/edit-page/edit-page";
import { withPrefix } from "gatsby";

interface StaffListPageProps {
  staff?: Map<string, Staff>;
  linkDetailPages?: boolean;
  onClickCallback?: (id: string) => void;
}

interface ExhibitsListPageState {
  createFormOpen: boolean;
}

class StaffListPage extends React.PureComponent<
  StaffListPageProps,
  ExhibitsListPageState
> {
  public getListElementWrapper = memoize(
    (
      staff: Map<string, Staff>,
      linkDetailPages: boolean,
      onClickCallback: (id: string) => void
    ): ListElementWrapper => {
      const onClickCallbackConstructor = (
        staffId: string
      ): (() => void) => () => {
        if (!!onClickCallback) {
          onClickCallback(staffId);
        } else {
          navigate(withPrefix(`/staff-details?id=${staffId}`));
        }
      };
      const listElems = Array.from(staff.values()).map(
        (staff: Staff): StaffListElement =>
          new StaffListElement(
            staff,
            linkDetailPages || !!onClickCallback
              ? onClickCallbackConstructor(staff.id)
              : undefined
          )
      );
      return new StaffListWrapper(listElems);
    },
    isEqual
  );

  constructor(props: StaffListPageProps) {
    super(props);
    this.state = { createFormOpen: false };
  }

  public static mapStateToProps(state: AppState): any {
    return {
      staff: state.staff,
    };
  }

  public setCreateFormOpenState(newState: boolean): void {
    this.setState({ createFormOpen: newState });
  }

  public render(): JSX.Element {
    const staffListWrapper = this.getListElementWrapper(
      this.props.staff,
      this.props.linkDetailPages,
      this.props.onClickCallback
    );

    const createFormContents = !!this.state.createFormOpen ? (
      <div className="instance-list-create-form-container">
        <ConnectedEditPage
          editorTemplate={Staff.getNewEditorTemplate()}
          editMode={true}
          onCancelCallback={this.setCreateFormOpenState.bind(this, false)}
          onSuccessCallback={this.setCreateFormOpenState.bind(this, false)}
          title="Register Staff"
        />
      </div>
    ) : (
      <button
        className="btn btn-success instance-list-create-button"
        onClick={this.setCreateFormOpenState.bind(this, true)}
      >
        Register Staff
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
            listElementWrapper={staffListWrapper}
            includeSearchFilter={true}
            tableMode={true}
          />
        </div>
      </div>
    );
  }
}

const ConnectedStaffListPage = connect(StaffListPage.mapStateToProps)(
  StaffListPage
);
export default ConnectedStaffListPage;
