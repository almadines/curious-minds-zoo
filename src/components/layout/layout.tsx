import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const LayoutSideNav = styled.div`
  display: flex;
  min-width: 12rem;
  flex-direction: column;
  margin: 1rem 1rem 1rem 1rem;
  border-right: solid 1px darkslategrey;
`;

const LayoutMainContent = styled.div`
  margin-left: 2rem;
`;

export class Layout extends React.Component {
  render(): JSX.Element {
    return (
      <LayoutWrapper className={`layout-wrapper`}>
        <LayoutSideNav className="layout-side-nav">
          <h3 className="display-4">Nav:</h3>
          <ul className="list-unstyled">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/Animals/">Animals</Link>
            </li>
            <li>
              <Link to="/Exhibits/">Exhibits</Link>
            </li>
            <li>
              <Link to="/Staff/">Staff</Link>
            </li>
          </ul>
        </LayoutSideNav>
        <LayoutMainContent className="layout-main-content">
          {this.props.children}
        </LayoutMainContent>
      </LayoutWrapper>
    );
  }
}
