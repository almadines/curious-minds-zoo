import * as React from "react";
import { ConnectedLayout } from "../components/layout/layout";

class AboutPage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <ConnectedLayout title="About page:" iconName="info">
        <div className="main-content-margins">
          Welcome to the about page! This will be filled out, eventually...
        </div>
      </ConnectedLayout>
    );
  }
}

export default AboutPage;
