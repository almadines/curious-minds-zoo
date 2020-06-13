import * as React from "react";
import { Layout } from "../components/layout/layout";
import ConnectedAnimalDetailPage from "components/detail-page/animal-detail-page";

class AnimalsPage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout>
        <h1 className="display-1">Animal details:</h1>
        <ConnectedAnimalDetailPage allowEditing={true} />
      </Layout>
    );
  }
}

export default AnimalsPage;
