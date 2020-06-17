import { Staff } from "./../src/global/types/staff";
import { AnimalType } from "./../src/global/types/animals";
import { Animal } from "../src/global/types/animals";
import { Exhibit } from "../src/global/types/exhibit";

interface StoreInitialState {
  animals: Map<string, Animal>;
  exhibits: Map<string, Exhibit>;
  staff: Map<string, Staff>;
}

export const initialStoreObjects: StoreInitialState = {
  animals: new Map(),
  exhibits: new Map(),
  staff: new Map(),
};

initialStoreObjects.animals.set(
  "1",
  new Animal("1", AnimalType.bird, "Bethy", "Female", "")
);
initialStoreObjects.animals.set(
  "2",
  new Animal("2", AnimalType.cat, "Bin Chicken", "Male", "")
);
initialStoreObjects.animals.set(
  "3",
  new Animal("3", AnimalType.dog, "Prince", "Male", "")
);
initialStoreObjects.animals.set(
  "4",
  new Animal("4", AnimalType.dog, "Antei", "Male", "")
);
initialStoreObjects.animals.set(
  "5",
  new Animal("5", AnimalType.cat, "Soot", "Female", "")
);
initialStoreObjects.animals.set(
  "6",
  new Animal("6", AnimalType.cat, "Kipper", "Female", "")
);
initialStoreObjects.animals.set(
  "7",
  new Animal("7", AnimalType.cat, "Gus", "Male", "")
);
initialStoreObjects.animals.set(
  "8",
  new Animal("8", AnimalType.lion, "Larry", "Female", "")
);
initialStoreObjects.animals.set(
  "9",
  new Animal("9", AnimalType.mouse, "Spot", "Male", "")
);
initialStoreObjects.animals.set(
  "10",
  new Animal("10", AnimalType.mouse, "Kris", "Female", "")
);
