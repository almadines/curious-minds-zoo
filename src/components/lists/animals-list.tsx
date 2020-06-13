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

interface AnimalsListPageProps {
  animals?: Animal[]; // from redux
  notAssignedToExhibit?: boolean;
  exhibitId?: string;
  staffId?: string;
  linkDetailPages?: boolean;
}

class AnimalsListPage extends React.PureComponent<AnimalsListPageProps> {
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

  public render(): JSX.Element {
    const animalListElements = this.getListElements(
      this.props.animals,
      this.props.linkDetailPages
    );

    return (
      <div>
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
