import * as React from "react";
import { Layout } from "../components/layout/layout";
import ConnectedExhibitsListPage from "components/lists/exhibits-list";

class ExhibitsPage extends React.Component {
  render(): JSX.Element {
    return (
      <Layout title="Exhibits:" iconName="house_siding">
        <ConnectedExhibitsListPage linkDetailPages={true} />
      </Layout>
    );
  }
}

export default ExhibitsPage;
