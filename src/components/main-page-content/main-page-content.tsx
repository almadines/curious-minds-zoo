import * as React from "react";
import ConnectedViewEditorPage from "components/detail-page/view-editor-page";
import { companyLetter } from "../../static/image-imports";
import styled from "styled-components";
import "./main-page-content.scss";

const CenteringDiv = styled.div`
  display: flex;
  justify-content: center;
`;

class MainPageContent extends React.PureComponent {
  public render(): JSX.Element {
    const mainPageLetter = (
      <img src={companyLetter} className="main-page-letter" />
    );

    return (
      <div>
        <h6 className="bold-text">View Mode:</h6>
        <CenteringDiv>
          <ConnectedViewEditorPage />
        </CenteringDiv>
        <h6 className="bold-text text-block">Letter from the director:</h6>
        <div className="main-page-letter-wrapper">{mainPageLetter}</div>
      </div>
    );
  }
}

export default MainPageContent;
