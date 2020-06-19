import * as React from "react";
import { Layout } from "../components/layout/layout";
import ConnectedAnimalDetailPage from "components/detail-page/animal-detail-page";
import { getMemoizedIdFunction } from "global/helper/extract-query-parameter";

interface AnimalDetailsProps {
  location: any;
}

class AnimalDetails extends React.PureComponent<AnimalDetailsProps> {
  public getId: (
    searchString?: string
  ) => string | undefined = getMemoizedIdFunction();

  public render(): JSX.Element {
    const queryData = this.props.location
      ? this.props.location.search
      : undefined;

    return (
      <Layout title="Animal Details" iconName="pets">
        <ConnectedAnimalDetailPage
          allowEditing={true}
          id={this.getId(queryData)}
        />
      </Layout>
    );
  }
}

export default AnimalDetails;
