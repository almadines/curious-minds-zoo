import * as React from "react";
import { extractQueryParameter } from "global/helper/extract-query-parameter";
import { connect } from "react-redux";
import { AppState } from "global/state/state";
import { EditorTemplate } from "global/types/editor-template";
import DetailPage from "./detail-page";

interface ExhibitDetailPageProps {
  allowEditing?: boolean;
  id: string;
  hideBackButton?: boolean;
  // redux
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
  ): any {
    return state.exhibits.get(ownProps.id)
      ? { editorTemplate: state.exhibits.get(ownProps.id).getEditorTemplate() }
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
          returnPath={!this.props.hideBackButton ? "/exhibits/" : undefined}
        />
      </div>
    );
  }
}

const ConnectedExhibitDetailPage = connect(ExhibitDetailPage.mapStateToProps)(
  ExhibitDetailPage
);

export default ConnectedExhibitDetailPage;
