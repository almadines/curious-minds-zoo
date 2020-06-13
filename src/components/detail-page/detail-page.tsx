import * as React from "react";
import { EditorTemplate } from "global/types/editor-template";
import ConnectedEditPage from "components/edit-page/edit-page";

interface DetailPageProps {
  editorTemplate: EditorTemplate;
  allowEditing?: boolean;
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

  public render(): JSX.Element {
    return (
      <div className="detail-wrapper">
        <button onClick={this.toggleEditMode.bind(this)}>
          {this.state.isEditing ? "Stop editing" : "Edit"}
        </button>
        <ConnectedEditPage
          editorTemplate={this.props.editorTemplate}
          editMode={this.state.isEditing}
        />
      </div>
    );
  }
}

export default DetailPage;
