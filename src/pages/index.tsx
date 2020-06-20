import * as React from "react";
import { ConnectedLayout } from "../components/layout/layout";
import ConnectedSettingsEditorPage from "components/detail-page/settings-editor-page";

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <ConnectedLayout title="Main Page" iconName="menu">
        <div className="main-content-margins">
          This is a simplified zoo management application, please explore.
          <ConnectedSettingsEditorPage />
        </div>
      </ConnectedLayout>
    );
  }
}

export default Home;
