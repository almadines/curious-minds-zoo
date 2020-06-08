import * as React from "react";
import { Layout } from "../components/layout/layout";
import ExhibitCreate from "components/create-page/exhibits-create";
import ConnectedCreatePage from "components/create-page/create-page";
import { Exhibit } from "global/types/exhibit";

class ExhibitCreatePage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout>
        <ConnectedCreatePage editorTemplate={Exhibit.getNewEditorTemplate()} />
      </Layout>
    );
  }
}

export default ExhibitCreatePage;
