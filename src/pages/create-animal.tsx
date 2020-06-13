import * as React from "react";
import { Layout } from "../components/layout/layout";
import ConnectedEditPage from "components/create-page/edit-page";
import { Animal } from "global/types/animals";

class AnimalCreatePage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout>
        <ConnectedEditPage
          editorTemplate={Animal.getNewEditorTemplate()}
          editMode={true}
        />
      </Layout>
    );
  }
}

export default AnimalCreatePage;
