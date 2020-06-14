import * as React from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import { Animal } from "global/types/animals";
import { AppState } from "global/state/state";
import { ListElement, AnimalListElement } from "global/types/list-element";
import ListDisplay from "./list-display";
import { isEqual } from "lodash";
import { Exhibit } from "global/types/exhibit";
import { navigate } from "@reach/router";
import ConnectedEditPage from "components/edit-page/edit-page";
import "./instance-list-styles.scss";

interface AnimalsListPageProps {
  animals?: Animal[]; // from redux
  notAssignedToExhibit?: boolean;
  exhibitId?: string;
  staffId?: string;
  linkDetailPages?: boolean;
}

interface AnimalsListPageState {
  createFormOpen: boolean;
}

class AnimalsListPage extends React.PureComponent<
  AnimalsListPageProps,
  AnimalsListPageState
> {
  public getListElements = memoize(
    (animals: Animal[], linkDetailPages: boolean): ListElement[] => {
      const onClickCallbackConstructor = (
        animalId: string
      ): (() => void) => () => {
        navigate(`/animal-details?id=${animalId}`);
      };

      return Array.from(animals.values()).map(
        (animal: Animal): ListElement =>
          new AnimalListElement(
            animal,
            linkDetailPages ? onClickCallbackConstructor(animal.id) : undefined
          )
      );
    },
    isEqual
  );

  constructor(props: AnimalsListPageProps) {
    super(props);
    this.state = { createFormOpen: false };
  }

  public static mapStateToProps(
    state: AppState,
    ownProps: AnimalsListPageProps
  ): any {
    let animalIds = Array.from(state.animals.keys());

    const filterByIdList = (
      currentIds: string[],
      filterList: string[],
      includeFilterList: boolean = false
    ): string[] => {
      const animalIdsInMap = new Map<string, void>();
      filterList.forEach((animalId: string): void => {
        animalIdsInMap.set(animalId, null);
      });

      if (includeFilterList) {
        return currentIds.filter((id: string): boolean =>
          animalIdsInMap.has(id)
        );
      } else {
        return currentIds.filter(
          (id: string): boolean => !animalIdsInMap.has(id)
        );
      }
    };

    if (ownProps.notAssignedToExhibit) {
      const animalIdsAssignedToAnExhibit = ([] as string[]).concat(
        ...Array.from(state.exhibits.values()).map(
          (exhibit: Exhibit): string[] => exhibit.animalIds
        )
      );

      animalIds = filterByIdList(
        animalIds,
        animalIdsAssignedToAnExhibit,
        false
      );
    }

    if (!!ownProps.staffId) {
      const staff = state.staff.get(ownProps.staffId);
      if (!!staff) {
        animalIds = filterByIdList(animalIds, staff.animalIds, true);
      } else {
        console.warn(
          "Staff Id provided to AnimalsList does not exist, ignoring filter!"
        );
      }
    }

    if (!!ownProps.exhibitId) {
      const exhibit = state.exhibits.get(ownProps.exhibitId);
      if (!!exhibit) {
        animalIds = filterByIdList(animalIds, exhibit.animalIds, true);
      } else {
        console.warn(
          "Exhibit Id provided to AnimalsList does not exist, ignoring filter!"
        );
      }
    }

    const animals = animalIds
      .map((id: string): Animal | undefined => state.animals.get(id))
      .filter((animal: Animal): animal is Animal => !!animal)
      .sort((a: Animal, b: Animal): number => (a.name > b.name ? 1 : -1));

    if (animals.length !== animalIds.length) {
      console.warn(
        "could not find all animal Ids, there may be some entries missing!"
      );
    }

    return {
      animals,
    };
  }

  public setCreateFormOpenState(newState: boolean): void {
    this.setState({ createFormOpen: newState });
  }

  public render(): JSX.Element {
    const animalListElements = this.getListElements(
      this.props.animals,
      this.props.linkDetailPages
    );

    const createFormContents = !!this.state.createFormOpen ? (
      <div className="instance-list-create-form-container">
        <ConnectedEditPage
          editorTemplate={Animal.getNewEditorTemplate()}
          editMode={true}
          onCancelCallback={this.setCreateFormOpenState.bind(this, false)}
          onSuccessCallback={this.setCreateFormOpenState.bind(this, false)}
        />
      </div>
    ) : (
      <button
        className="btn btn-primary"
        onClick={this.setCreateFormOpenState.bind(this, true)}
      >
        Create Animal
      </button>
    );

    return (
      <div className="instance-list-wrapper">
        <div
          className={`instance-list-create-form-wrapper ${
            this.state.createFormOpen
              ? "create-form-open"
              : "create-form-closed"
          }`}
        >
          {createFormContents}
        </div>

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
