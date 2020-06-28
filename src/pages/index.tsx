import * as React from "react";
import { ConnectedLayout } from "../components/layout/layout";
import MainPageContent from "components/main-page-content/main-page-content";

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <ConnectedLayout title="Zoo Management" iconName="menu">
        <div className="main-content-margins">
          <MainPageContent />
        </div>
      </ConnectedLayout>
    );
  }
}

export default Home;
