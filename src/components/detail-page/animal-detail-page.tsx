import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "global/state/state";
import { EditorTemplate } from "global/types/editor-template";
import DetailPage from "./detail-page";

interface AnimalDetailPageProps {
  allowEditing?: boolean;
  id: string;
  //redux
  editorTemplate?: EditorTemplate;
}

interface AnimalDetailPageState {}

class AnimalDetailPage extends React.PureComponent<
  AnimalDetailPageProps,
  AnimalDetailPageState
> {
  public constructor(props: AnimalDetailPageProps) {
    super(props);
  }

  public static mapStateToProps(
    state: AppState,
    ownProps: AnimalDetailPageProps
  ): any {
    return state.animals.get(ownProps.id)
      ? { editorTemplate: state.animals.get(ownProps.id).getEditorTemplate() }
      : {};
  }

  public render(): JSX.Element {
    if (!this.props.editorTemplate) {
      console.error("No editor template found! Error!");
      return null;
    }
    return (
      <div className="animal-detail-wrapper">
        <DetailPage
          editorTemplate={this.props.editorTemplate}
          returnPath="/animals"
        />
      </div>
    );
  }
}

const ConnectedAnimalDetailPage = connect(AnimalDetailPage.mapStateToProps)(
  AnimalDetailPage
);

export default ConnectedAnimalDetailPage;
