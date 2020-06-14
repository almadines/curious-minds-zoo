import * as React from "react";
import { Link } from "gatsby";
import "./layout.scss";

interface LayoutProps {
  title: string;
}

export class Layout extends React.Component<LayoutProps> {
  render(): JSX.Element {
    return (
      <div className="layout-wrapper">
        <div className="layout-side-nav">
          <div className="layout-top-block layout-nav-title">
            <div className="layout-left-block-margin">
              <h3 className="display-4">Zoo manager</h3>
            </div>
          </div>
          <div className="layout-link-list">
            <Link to="/">Main Page</Link>
            <Link to="/animals/">Animals</Link>
            <Link to="/animal-create/">Create Animal</Link>
            <Link to="/exhibits/">Exhibits</Link>
            <Link to="/exhibit-create/">Create Exhibit</Link>
            <Link to="/staff/">Staff</Link>
            <Link to="/staff-create/">Create Staff</Link>
          </div>
        </div>
        <div className="layout-main-content">
          <div className="layout-top-block">
            <div className="layout-left-block-margin">
              <h1 className="display-5">{this.props.title}</h1>
            </div>
          </div>
          <div className="layout-left-block-margin">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
