import { AppState } from "global/state/state";
import { Animal } from "global/types/animals";
import { Exhibit } from "global/types/exhibit";

export const getNonExhibitAssignedAnimals = (state: AppState): Animal[] => {
  let animalIds = Array.from(state.animals.keys());
  const animalIdsAssignedToAnExhibit = ([] as string[]).concat(
    ...Array.from(state.exhibits.values()).map(
      (exhibit: Exhibit): string[] => exhibit.animalIds
    )
  );
  const uniqueAssignedAnimalIds = Array.from(
    new Set(animalIdsAssignedToAnExhibit)
  );

  animalIds = filterByIdList(animalIds, uniqueAssignedAnimalIds, false);
  const animals = animalIds
    .map((id: string): Animal | undefined => state.animals.get(id))
    .filter((animal: Animal): animal is Animal => !!animal)
    .sort((a: Animal, b: Animal): number => (a.name > b.name ? 1 : -1));
  return animals;
};

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
    return currentIds.filter((id: string): boolean => animalIdsInMap.has(id));
  } else {
    return currentIds.filter((id: string): boolean => !animalIdsInMap.has(id));
  }
};
