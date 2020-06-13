import * as React from "react";
import { Layout } from "../components/layout/layout";
import ConnectedStaffDetailPage from "components/detail-page/staff-detail-page";

class AnimalsPage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout>
        <h1 className="display-1">Animal details:</h1>
        <ConnectedStaffDetailPage allowEditing={true} />
      </Layout>
    );
  }
}

export default AnimalsPage;
