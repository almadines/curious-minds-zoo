import * as React from "react";
import ConnectedAnimalsListPage from "components/lists/animals-list";
import ConnectedExhibitsListPage from "components/lists/animals-list";
import ConnectedStaffListPage from "components/lists/animals-list";
import "./column-view.scss";

interface ColumnViewProps {}

class ColumnView extends React.PureComponent<ColumnViewProps> {
  public constructor(props: ColumnViewProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="column-view-wrapper">
        <div className="column-view-inner-wrapper">
          <div>
            <ConnectedAnimalsListPage />
          </div>
          <div className="column-view-divider" />
          <div>
            <ConnectedExhibitsListPage />
          </div>

          <div className="column-view-divider" />
          <div>
            <ConnectedStaffListPage />
          </div>
        </div>
      </div>
    );
  }
}

export default ColumnView;
