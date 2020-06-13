import * as React from "react";
import { Layout } from "../components/layout/layout";
import ConnectedExhibitDetailPage from "components/detail-page/exhibit-detail-page";

class AnimalsPage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout>
        <h1 className="display-1">Animal details:</h1>
        <ConnectedExhibitDetailPage allowEditing={true} />
      </Layout>
    );
  }
}

export default AnimalsPage;
