import * as React from "react";
import { Layout } from "../components/layout/layout";
import ConnectedStaffListPage from "components/lists/staff-list";

class StaffPage extends React.Component {
  render(): JSX.Element {
    return (
      <Layout title="Staff:">
        <ConnectedStaffListPage linkDetailPages={true} />
      </Layout>
    );
  }
}

export default StaffPage;
