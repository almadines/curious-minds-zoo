import * as React from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import { Animal } from "global/types/animals";
import { AppState } from "global/state/state";
import { ListElement, AnimalListElement } from "global/types/list-element";
import ListDisplay from "./list-display";
import { isEqual } from "lodash";

interface AnimalsListPageProps {
  animals?: Map<string, Animal>;
}

class AnimalsListPage extends React.PureComponent<AnimalsListPageProps> {
  public getListElements = memoize(
    (animals: Map<string, Animal>): ListElement[] => {
      return Array.from(animals.values()).map(
        (animal: Animal): ListElement => new AnimalListElement(animal)
      );
    },
    isEqual
  );

  public static mapStateToProps(state: AppState): any {
    return {
      animals: state.animals,
    };
  }

  public render(): JSX.Element {
    const animalListElements = this.getListElements(this.props.animals);

    console.log("animalListElements: ", animalListElements);

    return (
      <div>
        <h1 className="display-1">Animals:</h1>
        <ListDisplay
          listElements={animalListElements || []}
          includeSearchFilter={true}
        />
      </div>
    );
  }
}

const ConnectedAnimalsListPage = connect(AnimalsListPage.mapStateToProps)(
  AnimalsListPage
);
export default ConnectedAnimalsListPage;
