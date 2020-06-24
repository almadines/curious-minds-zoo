import * as React from "react";
import { ConnectedLayout } from "../components/layout/layout";

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <ConnectedLayout title="Main Page" iconName="menu">
        <div className="main-content-margins">
          This is a simplified zoo management application, please explore.
        </div>
      </ConnectedLayout>
    );
  }
}

export default Home;
