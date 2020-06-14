import * as React from "react";
import { extractQueryParameter } from "global/helper/extract-query-parameter";
import { connect } from "react-redux";
import { AppState } from "global/state/state";
import { EditorTemplate } from "global/types/editor-template";
import DetailPage from "./detail-page";

interface StaffDetailPageProps {
  allowEditing?: boolean;
  id: string;
  // redux
  editorTemplate?: EditorTemplate;
}

interface StafDetailPageState {}

class StaffDetailPage extends React.PureComponent<
  StaffDetailPageProps,
  StafDetailPageState
> {
  public constructor(props: StaffDetailPageProps) {
    super(props);
  }

  public static mapStateToProps(
    state: AppState,
    ownProps: StaffDetailPageProps
  ): any {
    return state.staff.get(ownProps.id)
      ? { editorTemplate: state.staff.get(ownProps.id).getEditorTemplate() }
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
          returnPath="/staff/"
        />
      </div>
    );
  }
}

const ConnectedStaffDetailPage = connect(StaffDetailPage.mapStateToProps)(
  StaffDetailPage
);

export default ConnectedStaffDetailPage;
