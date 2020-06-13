import * as React from "react";
import { Layout } from "../components/layout/layout";
import { Staff } from "global/types/staff";
import ConnectedEditPage from "components/create-page/edit-page";

class StaffCreatePage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout>
        <ConnectedEditPage
          editorTemplate={Staff.getNewEditorTemplate()}
          editMode={true}
        />
      </Layout>
    );
  }
}

export default StaffCreatePage;
