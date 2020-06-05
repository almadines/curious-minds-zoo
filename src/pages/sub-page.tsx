import React from "react"
import { ConnectedCounter } from "../components/counter/counter";
import { Layout } from "../components/layout/layout";
import kitten from "../../static/kitten.jpg";
import "../styles/sub-page.scss";

class SubPage extends React.Component {
  render(): JSX.Element {
    return (
      <Layout>
        <h1 className="display-1">Sub page!</h1>
        <ConnectedCounter />
        <img src={kitten}></img>
      </Layout>
      
    );
  }
}

export default SubPage