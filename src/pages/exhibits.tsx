import * as React from "react";
import { Layout } from "../components/layout/layout";
import ConnectedExhibitsListPage from "components/lists/exhibits-list";

class ExhibitsPage extends React.Component {
  render(): JSX.Element {
    return (
      <Layout>
        <h1 className="display-1">Exhibits:</h1>
        <ConnectedExhibitsListPage />
      </Layout>
    );
  }
}

export default ExhibitsPage;
