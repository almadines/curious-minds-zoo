import * as React from "react";
import { ConnectedLayout } from "../components/layout/layout";
import ConnectedExhibitsListPage from "components/lists/exhibits-list";

class ExhibitsPage extends React.Component {
  render(): JSX.Element {
    return (
      <ConnectedLayout title="Exhibits:" iconName="house_siding">
        <ConnectedExhibitsListPage linkDetailPages={true} />
      </ConnectedLayout>
    );
  }
}

export default ExhibitsPage;
