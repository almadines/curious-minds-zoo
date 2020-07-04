import * as React from "react";
import { ConnectedLayout } from "../components/layout/layout";
import ConnectedStaffListPage from "components/lists/staff-list";

class StaffPage extends React.Component {
  render(): JSX.Element {
    return (
      <ConnectedLayout title="Staff:" iconName="person">
        <ConnectedStaffListPage linkDetailPages={true} />
      </ConnectedLayout>
    );
  }
}

export default StaffPage;
