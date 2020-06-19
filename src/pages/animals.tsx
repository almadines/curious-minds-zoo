import * as React from "react";
import { Layout } from "../components/layout/layout";
import ConnectedAnimalsListPage from "../components/lists/animals-list";

class AnimalsPage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout title="Animals:" iconName="pets">
        <ConnectedAnimalsListPage linkDetailPages={true} />
      </Layout>
    );
  }
}

export default AnimalsPage;
