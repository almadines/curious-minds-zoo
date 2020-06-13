import * as React from "react";
import { extractQueryParameter } from "global/helper/extract-query-parameter";
import { connect } from "react-redux";
import { AppState } from "global/state/state";
import { EditorTemplate } from "global/types/editor-template";
import DetailPage from "./detail-page";

interface ExhibitDetailPageProps {
  allowEditing?: boolean;
  location?: any;
  editorTemplate?: EditorTemplate;
}

interface ExhibitDetailPageState {}

class ExhibitDetailPage extends React.PureComponent<
  ExhibitDetailPageProps,
  ExhibitDetailPageState
> {
  public constructor(props: ExhibitDetailPageProps) {
    super(props);
  }

  public static mapStateToProps(
    state: AppState,
    ownProps: ExhibitDetailPageProps
  ): ExhibitDetailPageProps {
    const queryData = ownProps.location.search;
    const animalId = !!queryData
      ? extractQueryParameter(queryData, "id")
      : undefined;

    let animalTemplate: EditorTemplate | undefined = undefined;
    if (!!animalId && state.animals.get(animalId)) {
      animalTemplate = state.animals.get(animalId).getEditorTemplate();
    }

    return { editorTemplate: animalTemplate };
  }

  public render(): JSX.Element {
    return (
      <div className="animal-detail-wrapper">
        <DetailPage editorTemplate={this.props.editorTemplate} />
      </div>
    );
  }
}

const ConnectedExhibitDetailPage = connect(ExhibitDetailPage.mapStateToProps)(
  ExhibitDetailPage
);

export default ConnectedExhibitDetailPage;
