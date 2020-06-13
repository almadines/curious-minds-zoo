import * as React from "react";
import { Layout } from "../components/layout/layout";
import ConnectedExhibitDetailPage from "components/detail-page/exhibit-detail-page";
import memoizeOne from "memoize-one";
import { getMemoizedIdFunction } from "global/helper/extract-query-parameter";

interface ExhibitDetailsPageProps {
  location: any;
}

class ExhibitDetailsPage extends React.PureComponent<ExhibitDetailsPageProps> {
  public getId: (
    searchString?: string
  ) => string | undefined = getMemoizedIdFunction();

  public render(): JSX.Element {
    const queryData = this.props.location
      ? this.props.location.search
      : undefined;

    return (
      <Layout>
        <h1 className="display-1">Animal details:</h1>
        <ConnectedExhibitDetailPage
          allowEditing={true}
          id={this.getId(queryData)}
        />
      </Layout>
    );
  }
}

export default ExhibitDetailsPage;
