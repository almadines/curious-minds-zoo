import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "global/state/state";
import {
  Settings,
  SettingsView,
  BooleanEnum,
  EditorButtonLocation,
} from "global/types/settings";
import { ActionType } from "global/store/dispatchActions";

interface ViewEditorPageProps {
  //redux
  settings?: Settings;
  dispatchFunction?: Function;
}

class ViewEditorPage extends React.PureComponent<ViewEditorPageProps> {
  public constructor(props: ViewEditorPageProps) {
    super(props);
  }

  public static mapStateToProps(state: AppState): any {
    return { settings: state.settings };
  }

  public static mapDispatchToProps(dispatch: any): any {
    return {
      dispatchFunction: dispatch,
    };
  }

  public onViewClick(view: SettingsView, event: Event): void {
    event.stopPropagation();

    const newSettings = Settings.clone(this.props.settings || new Settings(""));

    switch (view) {
      default:
      case SettingsView.view1:
        newSettings.columnView = BooleanEnum.false;
        newSettings.editorButtonsAtTop = EditorButtonLocation.top;
        newSettings.expandableSideMenu = BooleanEnum.false;
        break;
      case SettingsView.view2:
        newSettings.columnView = BooleanEnum.false;
        newSettings.editorButtonsAtTop = EditorButtonLocation.bottom;
        newSettings.expandableSideMenu = BooleanEnum.true;
        break;
      case SettingsView.view3:
        newSettings.columnView = BooleanEnum.true;
        newSettings.editorButtonsAtTop = EditorButtonLocation.top;
        newSettings.expandableSideMenu = BooleanEnum.false;
        break;
    }

    if (this.props.dispatchFunction) {
      this.props.dispatchFunction({
        type: ActionType.upsert,
        values: [newSettings],
        names: [Settings.name],
      });
    } else {
      console.error("No dispatch function found from view editor page!");
    }
  }

  public render(): JSX.Element {
    return (
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.onViewClick.bind(this, SettingsView.view1)}
        >
          View Mode 1
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.onViewClick.bind(this, SettingsView.view2)}
        >
          View Mode 2
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.onViewClick.bind(this, SettingsView.view3)}
        >
          View Mode 3
        </button>
      </div>
    );
  }
}

const ConnectedViewEditorPage = connect(
  ViewEditorPage.mapStateToProps,
  ViewEditorPage.mapDispatchToProps
)(ViewEditorPage);

export default ConnectedViewEditorPage;
