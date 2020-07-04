import * as React from "react";
import { ActionType } from "global/store/dispatchActions";
import { Settings } from "global/types/settings";
import { connect } from "react-redux";
import "./reset-button.scss";

export interface ResetButtonProps {
  //from redux
  dispatchFunction?: Function;
}

class ResetButton extends React.PureComponent<ResetButtonProps> {
  public constructor(props: ResetButtonProps) {
    super(props);
  }

  public static mapDispatchToProps(dispatch: any): any {
    return { dispatchFunction: dispatch };
  }

  public resetSettings(event: Event): void {
    event.stopPropagation();
    if (this.props.dispatchFunction) {
      this.props.dispatchFunction({
        type: ActionType.upsert,
        values: [new Settings("")],
        names: [Settings.name],
      });
    }
  }

  public render(): JSX.Element {
    return (
      <button
        className="btn btn-dark reset-button-wrapper"
        onClick={this.resetSettings.bind(this)}
      >
        {/* <i className="material-icons reset-button-icon">refresh</i> */}
        Reset
      </button>
    );
  }
}

const ConnectedResetButton = connect(
  null,
  ResetButton.mapDispatchToProps
)(ResetButton);

export default ConnectedResetButton;
