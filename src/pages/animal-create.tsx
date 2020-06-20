import * as React from "react";
import { ConnectedLayout } from "../components/layout/layout";
import ConnectedEditPage from "components/edit-page/edit-page";
import { Animal } from "global/types/animals";

class AnimalCreatePage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <ConnectedLayout title="Create Animal" iconName="pets">
        <ConnectedEditPage
          editorTemplate={Animal.getNewEditorTemplate()}
          editMode={true}
        />
      </ConnectedLayout>
    );
  }
}

export default AnimalCreatePage;
