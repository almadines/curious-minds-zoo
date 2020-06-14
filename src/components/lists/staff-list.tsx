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

interface StaffListPageProps {
  staff?: Map<string, Staff>;
  linkDetailPages?: boolean;
}

interface ExhibitsListPageState {
  createFormOpen: boolean;
}

class StaffListPage extends React.PureComponent<
  StaffListPageProps,
  ExhibitsListPageState
> {
  public getListElementWrapper = memoize(
    (staff: Map<string, Staff>): ListElementWrapper => {
      const onClickCallbackConstructor = (
        staffId: string
      ): (() => void) => () => {
        navigate(`/staff-details?id=${staffId}`);
      };
      const listElems = Array.from(staff.values()).map(
        (staff: Staff): StaffListElement =>
          new StaffListElement(staff, onClickCallbackConstructor(staff.id))
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
    const staffListWrapper = this.getListElementWrapper(this.props.staff);

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
