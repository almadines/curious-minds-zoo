import * as React from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import { Animal } from "../../global/types/animals";
import { AppState } from "../../global/state/state";
import ListDisplay from "./list-display";
import { ListElement, AnimalListElement } from "global/types/list-element";

interface AnimalsListPageProps {
  animals?: Set<Animal>;
}

class AnimalsListPage extends React.PureComponent<AnimalsListPageProps> {
  public getListElements = memoize((animals: Animal[]): ListElement[] => {
    return animals.map(
      (animal: Animal): ListElement => new AnimalListElement(animal)
    );
  });

  public static mapStateToProps(state: AppState): any {
    return {
      animals: state.animals,
    };
  }

  public render(): JSX.Element {
    const animalListElements = this.getListElements(
      Array.from(this.props.animals)
    );

    return (
      <div>
        <h1 className="display-1">Animals:</h1>
        <ListDisplay
          listElements={animalListElements}
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
