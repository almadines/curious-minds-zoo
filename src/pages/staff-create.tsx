import * as React from "react";
import { ConnectedLayout } from "../components/layout/layout";
import { Staff } from "global/types/staff";
import ConnectedEditPage from "components/edit-page/edit-page";

class StaffCreatePage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <ConnectedLayout title="Create Staff" iconName="person">
        <ConnectedEditPage
          editorTemplate={Staff.getNewEditorTemplate()}
          editMode={true}
        />
      </ConnectedLayout>
    );
  }
}

export default StaffCreatePage;
