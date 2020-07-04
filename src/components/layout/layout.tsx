import * as React from "react";
import { Link } from "gatsby";
import "./layout.scss";
import { SaveElement } from "global/store/store-init";
import { AppState } from "global/state/state";
import { connect } from "react-redux";
import { Settings, BooleanEnum } from "global/types/settings";
import ColumnView from "components/column-view/column-view";
import ConnectedResetButton from "components/reset-button/reset-button";

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
  applyDefaultColourToMainContent?: boolean;
  //from redux:
  settings?: Settings;
  //intrisic to react:
  children: any;
}

interface LayoutState {
  sideMenuExpanded: boolean;
}

class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);

    this.state = { sideMenuExpanded: false };
  }
  public static mapStateToProps(state: AppState): any {
    return { settings: state.settings || new Settings("") };
  }

  public setSideMenuExpanded(newValue: boolean): void {
    this.setState({ sideMenuExpanded: newValue });
  }

  public changeSideMenuState(newValue: boolean, event: Event): void {
    this.blockEventPropagation(event);
    this.setState({ sideMenuExpanded: newValue });
  }

  public blockEventPropagation(event: Event): void {
    event.stopPropagation();
  }

  public render(): JSX.Element {
    return this.props.settings &&
      this.props.settings.columnView === BooleanEnum.true
      ? this.renderColumn()
      : this.renderNormal();
  }

  public renderColumn(): JSX.Element {
    return <ColumnView />;
  }

  public renderNormal(): JSX.Element {
    const icon = this.props.iconName ? (
      <i className="material-icons">{this.props.iconName}</i>
    ) : null;

    const layoutWrapperStyle = this.props.settings
      ? {
          fontFamily: `${this.props.settings.fontFamily}, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji`,
          backgroundColor: `${this.props.settings.backgroundColour}`,
          color: `${this.props.settings.textColour}`,
        }
      : undefined;

    const expandableSideMenuCss =
      this.props.settings.expandableSideMenu === BooleanEnum.true
        ? "layout-side-nav-expandable"
        : "";
    const sideMenuExpandedCss = this.state.sideMenuExpanded
      ? "layout-side-nav-expanded"
      : "layout-side-nav-collapsed";

    const sideMenuButton =
      this.props.settings.expandableSideMenu === BooleanEnum.true ? (
        <i
          className="material-icons colour-red"
          onClick={this.changeSideMenuState.bind(this, true)}
        >
          menu
        </i>
      ) : null;

    const sideNavBacking =
      this.props.settings.expandableSideMenu === BooleanEnum.true ? (
        <div
          className={`layout-side-nav-backing ${sideMenuExpandedCss}`}
          onClick={this.changeSideMenuState.bind(this, false)}
        />
      ) : null;

    return (
      <div
        className="layout-wrapper"
        style={layoutWrapperStyle}
        onClick={this.setSideMenuExpanded.bind(this, false)}
      >
        <ConnectedSaveElementWrapper />
        {sideNavBacking}
        <div
          className={`layout-side-nav ${expandableSideMenuCss} ${sideMenuExpandedCss}`}
          onClick={this.blockEventPropagation.bind(this)}
        >
          <div className="layout-side-nav-inner-wrapper">
            <div className="layout-top-block">
              <div className="layout-nav-title">{icon}</div>
            </div>
            <div className="layout-link-list">
              <Link to="/" onClick={this.setSideMenuExpanded.bind(this, false)}>
                <i className="material-icons layout-link-icon">menu</i>Main Page
              </Link>
              <Link
                to="/animals/"
                onClick={this.setSideMenuExpanded.bind(this, false)}
              >
                <i className="material-icons layout-link-icon">pets</i>Animals
              </Link>
              <Link
                to="/exhibits/"
                onClick={this.setSideMenuExpanded.bind(this, false)}
              >
                <i className="material-icons layout-link-icon">house_siding</i>
                Exhibits
              </Link>
              <Link
                to="/staff/"
                onClick={this.setSideMenuExpanded.bind(this, false)}
              >
                <i className="material-icons layout-link-icon">person</i>Staff
              </Link>
              <Link
                to="/options/"
                onClick={this.setSideMenuExpanded.bind(this, false)}
              >
                <i className="material-icons layout-link-icon">edit</i>Options
              </Link>
            </div>
          </div>
        </div>
        <div className="layout-right-block">
          <div className="layout-top-block">
            <div className="layout-top-block-title">
              <div className="layout-title">
                <div className="layout-side-menu-button-wrapper">
                  {sideMenuButton}
                </div>
                <h1 className="display-5">{this.props.title}</h1>
              </div>
              <ConnectedResetButton />
            </div>
          </div>
          <div
            className={`layout-main-content ${
              this.props.applyDefaultColourToMainContent
                ? "default-colours"
                : ""
            }`}
          >
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
