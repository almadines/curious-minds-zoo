import * as React from "react";
import { ConnectedLayout } from "../components/layout/layout";
import ConnectedEditPage from "components/edit-page/edit-page";
import { Exhibit } from "global/types/exhibit";

class ExhibitCreatePage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <ConnectedLayout title="Create Exhibit" iconName="house_siding">
        <ConnectedEditPage
          editorTemplate={Exhibit.getNewEditorTemplate()}
          editMode={true}
        />
      </ConnectedLayout>
    );
  }
}

export default ExhibitCreatePage;
