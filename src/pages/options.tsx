import * as React from "react";
import { ConnectedLayout } from "../components/layout/layout";
import ConnectedSettingsEditorPage from "components/detail-page/settings-editor-page";

class SettingsPage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <ConnectedLayout
        title="Options:"
        iconName="edit"
        applyDefaultColourToMainContent={true}
      >
        <div className="main-content-margins">
          <ConnectedSettingsEditorPage />
        </div>
      </ConnectedLayout>
    );
  }
}

export default SettingsPage;
