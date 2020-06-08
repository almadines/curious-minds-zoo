import * as React from "react";
import { Layout } from "../components/layout/layout";
import ExhibitCreate from "components/create-page/exhibits-create";

class ExhibitCreatePage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout>
        <ExhibitCreate />
      </Layout>
    );
  }
}

export default ExhibitCreatePage;
