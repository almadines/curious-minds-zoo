import * as React from "react";
import ConnectedViewEditorPage from "components/detail-page/view-editor-page";
import styled from "styled-components";

const CenteringDiv = styled.div`
  display: flex;
  justify-content: center;
`;

class MainPageContent extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <div>
        <h6>View Mode:</h6>
        <CenteringDiv>
          <ConnectedViewEditorPage />
        </CenteringDiv>
        <h6 className="margin-top-spacing">Instructions:</h6>
      </div>
    );
  }
}

export default MainPageContent;
