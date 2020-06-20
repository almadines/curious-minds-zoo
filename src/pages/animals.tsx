import * as React from "react";
import { ConnectedLayout } from "../components/layout/layout";
import ConnectedAnimalsListPage from "../components/lists/animals-list";

class AnimalsPage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <ConnectedLayout title="Animals:" iconName="pets">
        <ConnectedAnimalsListPage linkDetailPages={true} />
      </ConnectedLayout>
    );
  }
}

export default AnimalsPage;
