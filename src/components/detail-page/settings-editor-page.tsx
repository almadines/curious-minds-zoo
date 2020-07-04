import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "global/state/state";
import { EditorTemplate } from "global/types/editor-template";
import { Settings } from "global/types/settings";
import ConnectedAutoUpdateEditPage from "components/edit-page/auto-update-edit-page";

interface SettingsPageProps {
  //redux
  editorTemplate?: EditorTemplate;
}

class SettingsEditorPage extends React.PureComponent<SettingsPageProps> {
  public constructor(props: SettingsPageProps) {
    super(props);
  }

  public static mapStateToProps(state: AppState): any {
    return state.settings
      ? { editorTemplate: state.settings.getEditorTemplate() }
      : Settings.getNewEditorTemplate;
  }

  public render(): JSX.Element {
    if (!this.props.editorTemplate) {
      console.error("No editor template! Error!");
      return null;
    }
    return (
      <div className="settings-editor-wrapper">
        <ConnectedAutoUpdateEditPage
          editorTemplate={this.props.editorTemplate}
          editMode={true}
        />
      </div>
    );
  }
}

const ConnectedSettingsEditorPage = connect(SettingsEditorPage.mapStateToProps)(
  SettingsEditorPage
);

export default ConnectedSettingsEditorPage;
