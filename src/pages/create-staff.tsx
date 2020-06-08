import * as React from "react";
import { Layout } from "../components/layout/layout";
import StaffCreate from "components/create-page/staff-create";

class StaffCreatePage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout>
        <StaffCreate />
      </Layout>
    );
  }
}

export default StaffCreatePage;
