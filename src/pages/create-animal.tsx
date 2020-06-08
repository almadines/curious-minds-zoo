import * as React from "react";
import { Layout } from "../components/layout/layout";
import ConnectedCreatePage from "components/create-page/create-page";
import { Animal } from "global/types/animals";

class AnimalCreatePage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout>
        <ConnectedCreatePage editorTemplate={Animal.getNewEditorTemplate()} />
      </Layout>
    );
  }
}

export default AnimalCreatePage;
