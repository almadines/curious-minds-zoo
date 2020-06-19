import * as React from "react";
import { Layout } from "../components/layout/layout";

class AboutPage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout title="About page:" iconName="info">
        <div className="main-content-margins">
          Welcome to the about page! This will be filled out, eventually...
        </div>
      </Layout>
    );
  }
}

export default AboutPage;
