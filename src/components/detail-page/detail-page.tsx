import * as React from "react";
import { EditorTemplate } from "global/types/editor-template";
import ConnectedEditPage from "components/edit-page/edit-page";
import "./detail-page.scss";
import { navigate } from "gatsby";

interface DetailPageProps {
  editorTemplate: EditorTemplate;
  allowEditing?: boolean;
  returnPath?: string;
}

interface DetailPageState {
  isEditing: boolean;
}

class DetailPage extends React.PureComponent<DetailPageProps, DetailPageState> {
  public constructor(props: DetailPageProps) {
    super(props);

    this.state = { isEditing: false };
  }

  public toggleEditMode(): void {
    this.setState({ isEditing: !this.state.isEditing });
  }

  public setEditingState(newState: boolean): void {
    this.setState({ isEditing: newState });
  }

  public goBack(event: Event): void {
    event.stopPropagation();
    if (this.props.returnPath) {
      navigate(this.props.returnPath);
    } else {
      history.back();
    }
  }

  public render(): JSX.Element {
    const toggleEditingStateButton = !this.state.isEditing ? (
      <button
        className="btn btn-primary"
        onClick={this.setEditingState.bind(this, !this.state.isEditing)}
      >
        {this.state.isEditing ? "Stop editing" : "Edit"}
      </button>
    ) : null;

    return (
      <div className="detail-wrapper">
        <div className="detail-header-button-wrapper">
          <button className="btn btn-primary" onClick={this.goBack.bind(this)}>
            Back
          </button>
          {toggleEditingStateButton}
        </div>

        <ConnectedEditPage
          editorTemplate={this.props.editorTemplate}
          editMode={this.state.isEditing}
          onCancelCallback={this.setEditingState.bind(this, false)}
          onSuccessCallback={this.setEditingState.bind(this, false)}
        />
      </div>
    );
  }
}

export default DetailPage;
