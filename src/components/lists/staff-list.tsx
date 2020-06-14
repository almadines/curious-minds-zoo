import * as React from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import { AppState } from "../../global/state/state";
import ListDisplay from "./list-display";
import {
  ListElement,
  StaffListElement,
  ListElementWrapper,
  StaffListWrapper,
} from "global/types/list-element";
import { isEqual } from "lodash";
import { Staff } from "global/types/staff";
import { navigate } from "@reach/router";

interface StaffListPageProps {
  staff?: Map<string, Staff>;
  linkDetailPages?: boolean;
}

class StaffListPage extends React.PureComponent<StaffListPageProps> {
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

  public static mapStateToProps(state: AppState): any {
    return {
      staff: state.staff,
    };
  }

  public render(): JSX.Element {
    const staffListWrapper = this.getListElementWrapper(this.props.staff);

    return (
      <div>
        <ListDisplay
          listElementWrapper={staffListWrapper}
          includeSearchFilter={true}
        />
      </div>
    );
  }
}

const ConnectedStaffListPage = connect(StaffListPage.mapStateToProps)(
  StaffListPage
);
export default ConnectedStaffListPage;
