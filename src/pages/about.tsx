import * as React from "react";
import { Layout } from "../components/layout/layout";

class AboutPage extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout title="About page:" iconName="info">
        Welcome to the about page! This will be filled out, eventually...
      </Layout>
    );
  }
}

export default AboutPage;
