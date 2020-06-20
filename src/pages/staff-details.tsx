import * as React from "react";
import { ConnectedLayout } from "../components/layout/layout";
import ConnectedStaffDetailPage from "components/detail-page/staff-detail-page";
import { getMemoizedIdFunction } from "global/helper/extract-query-parameter";

interface StaffDetailsProps {
  location: any;
}

class StaffDetailsPage extends React.PureComponent<StaffDetailsProps> {
  public getId: (
    searchString?: string
  ) => string | undefined = getMemoizedIdFunction();

  public render(): JSX.Element {
    const queryData = this.props.location
      ? this.props.location.search
      : undefined;

    return (
      <ConnectedLayout title="Staff Details" iconName="person">
        <ConnectedStaffDetailPage
          allowEditing={true}
          id={this.getId(queryData)}
        />
      </ConnectedLayout>
    );
  }
}

export default StaffDetailsPage;
