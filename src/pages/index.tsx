import * as React from "react";
import { Layout } from "../components/layout/layout";

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <Layout title="Main Page" iconName="menu">
        <div className="main-content-margins">
          This is a simplified zoo management application, please explore.
        </div>
      </Layout>
    );
  }
}

export default Home;
