import * as React from "react";
import { Layout } from "../components/layout/layout";
import ConnectedEditPage from "components/edit-page/edit-page";
import { Exhibit } from "global/types/exhibit";

class ExhibitCreatePage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout title="Create Exhibit" iconName="house_siding">
        <ConnectedEditPage
          editorTemplate={Exhibit.getNewEditorTemplate()}
          editMode={true}
        />
      </Layout>
    );
  }
}

export default ExhibitCreatePage;
