import React from "react"
import { ConnectedCounter } from "../components/counter/counter";
import { Layout } from "../components/layout/layout";

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <Layout>
        <h1 className="display-1">Hello Gatsby!</h1>
        <ConnectedCounter />

        <div className='test-colour'>Hello world!</div>

        <table className="table">
          <thead>
            <tr>
              <th>Row</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Clark</td>
              <td>Kent</td>
              <td>clarkkent@mail.com</td>
            </tr>
            <tr>
              <td>2</td>
              <td>John</td>
              <td>Carter</td>
              <td>johncarter@mail.com</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Peter</td>
              <td>Parker</td>
              <td>peterparker@mail.com</td>
            </tr>
          </tbody>
        </table>
      </Layout>

    );
  }
}

export default Home