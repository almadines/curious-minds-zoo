import * as React from "react";
import { Layout } from "../components/layout/layout";
import { Staff } from "global/types/staff";
import ConnectedCreatePage from "components/create-page/create-page";

class StaffCreatePage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout>
        <ConnectedCreatePage editorTemplate={Staff.getNewEditorTemplate()} />
      </Layout>
    );
  }
}

export default StaffCreatePage;
