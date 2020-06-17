import * as React from "react";
import { Link } from "gatsby";
import "./layout.scss";
import { SaveElement } from "global/store/store-init";
import { AppState } from "global/state/state";
import { connect } from "react-redux";

interface LayoutProps {
  title: string;
}

class SaveElementWrapper extends React.PureComponent {
  public static saveElement = new SaveElement();
  public static mapStateToProps(state: AppState): any {
    SaveElementWrapper.saveElement.stateChanged(state);
    return {};
  }

  render(): JSX.Element {
    return null;
  }
}

const ConnectedSaveElementWrapper = connect(SaveElementWrapper.mapStateToProps)(
  SaveElementWrapper
);

export class Layout extends React.Component<LayoutProps> {
  render(): JSX.Element {
    return (
      <div className="layout-wrapper">
        <ConnectedSaveElementWrapper />
        <div className="layout-side-nav">
          <div className="layout-top-block layout-nav-title">
            <div className="layout-nav-header">
              <h3 className="display-6"></h3>
            </div>
          </div>
          <div className="layout-link-list">
            <Link to="/">Main Page</Link>
            <Link to="/animals/">Animals</Link>
            <Link to="/exhibits/">Exhibits</Link>
            <Link to="/staff/">Staff</Link>
            <Link to="/about/">About</Link>
          </div>
        </div>
        <div className="layout-right-block">
          <div className="layout-top-block">
            <div className="layout-title">
              <h1 className="display-5">{this.props.title}</h1>
            </div>
          </div>
          <div className="layout-main-content">
            <div className="layout-main-content-padding">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
