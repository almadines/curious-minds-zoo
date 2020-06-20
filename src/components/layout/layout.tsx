import * as React from "react";
import { Link } from "gatsby";
import "./layout.scss";
import { SaveElement } from "global/store/store-init";
import { AppState } from "global/state/state";
import { connect } from "react-redux";
import { Settings } from "global/types/settings";

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

interface LayoutProps {
  title: string;
  iconName?: string;
  //from redux:
  settings?: Settings;
  //intrisic to react:
  children: any;
}

class Layout extends React.Component<LayoutProps> {
  public static mapStateToProps(state: AppState): any {
    return { settings: state.settings || new Settings("") };
  }

  public render(): JSX.Element {
    const icon = this.props.iconName ? (
      <i className="material-icons layout-link-icon">{this.props.iconName}</i>
    ) : null;

    const layoutWrapperStyle = this.props.settings
      ? {
          fontFamily: `${this.props.settings.fontFamily}, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji`,
        }
      : undefined;

    console.log("rendering with layoutwrapper style: ", layoutWrapperStyle);

    return (
      <div className="layout-wrapper" style={layoutWrapperStyle}>
        <ConnectedSaveElementWrapper />
        <div className="layout-side-nav">
          <div className="layout-top-block">
            <div className="layout-nav-title">{icon}</div>
          </div>
          <div className="layout-link-list">
            <Link to="/">
              <i className="material-icons layout-link-icon">menu</i>Main Page
            </Link>
            <Link to="/animals/">
              <i className="material-icons layout-link-icon">pets</i>Animals
            </Link>
            <Link to="/exhibits/">
              <i className="material-icons layout-link-icon">house_siding</i>
              Exhibits
            </Link>
            <Link to="/staff/">
              <i className="material-icons layout-link-icon">person</i>Staff
            </Link>
            <Link to="/about/">
              <i className="material-icons layout-link-icon">info</i>About
            </Link>
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

export const ConnectedLayout = connect(Layout.mapStateToProps)(Layout);

export default ConnectedLayout;
