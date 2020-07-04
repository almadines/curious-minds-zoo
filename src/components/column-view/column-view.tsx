import * as React from "react";
import ConnectedAnimalsListPage from "components/lists/animals-list";
import ConnectedExhibitsListPage from "components/lists/exhibits-list";
import ConnectedStaffListPage from "components/lists/staff-list";
import "./column-view.scss";
import ConnectedAnimalDetailPage from "components/detail-page/animal-detail-page";
import ConnectedStaffDetailPage from "components/detail-page/staff-detail-page";
import ConnectedExhibitDetailPage from "components/detail-page/exhibit-detail-page";
import ConnectedViewEditorPage from "components/detail-page/view-editor-page";
import MainPageContent from "components/main-page-content/main-page-content";

interface ColumnViewProps {}
interface ColumnViewState {
  selectedAnimalId?: string;
  selectedExhibitId?: string;
  selectedStaffId?: string;
}

class ColumnView extends React.PureComponent<ColumnViewProps, ColumnViewState> {
  public constructor(props: ColumnViewProps) {
    super(props);

    this.state = {};
  }

  public setAnimalId(id: string): void {
    this.setState({ selectedAnimalId: id });
  }

  public setExhibitId(id: string): void {
    this.setState({ selectedExhibitId: id });
  }

  public setStaffId(id: string): void {
    this.setState({ selectedStaffId: id });
  }

  public render(): JSX.Element {
    const animalDetails = this.state.selectedAnimalId ? (
      <ConnectedAnimalDetailPage
        id={this.state.selectedAnimalId}
        hideBackButton={true}
      />
    ) : null;

    const exhibitDetails = this.state.selectedExhibitId ? (
      <ConnectedExhibitDetailPage
        id={this.state.selectedExhibitId}
        hideBackButton={true}
      />
    ) : null;

    const staffDetails = this.state.selectedStaffId ? (
      <ConnectedStaffDetailPage
        id={this.state.selectedStaffId}
        hideBackButton={true}
      />
    ) : null;

    return (
      <div className="column-view-wrapper">
        <div className="column-view-inner-wrapper">
          <h1 className="display-5">Curious Minds Zoo</h1>
          <MainPageContent />
          <div className="column-view-divider" />
          <h3>Animals:</h3>
          <div>
            <ConnectedAnimalsListPage
              onClickCallback={this.setAnimalId.bind(this)}
            />
            {animalDetails}
          </div>
          <div className="column-view-divider" />
          <h3>Exhibits:</h3>
          <div>
            <ConnectedExhibitsListPage
              onClickCallback={this.setExhibitId.bind(this)}
            />
            {exhibitDetails}
          </div>
          <div className="column-view-divider" />
          <h3>Staff:</h3>
          <div>
            <ConnectedStaffListPage
              onClickCallback={this.setStaffId.bind(this)}
            />
            {staffDetails}
          </div>
        </div>
      </div>
    );
  }
}

export default ColumnView;
