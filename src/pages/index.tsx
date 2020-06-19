import * as React from "react";
import { Layout } from "../components/layout/layout";

class Home extends React.Component {
  render(): JSX.Element {
    return <Layout title="Main Page" iconName="menu"></Layout>;
  }
}

export default Home;
