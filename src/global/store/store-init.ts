import { Settings } from "./../types/settings";
import {
  antelope1,
  cheetah1,
  elephant1,
  gorilla1,
  lion1,
  parrot1,
  seagull1,
  tiger1,
  toucan1,
  wolf1,
  zebra1,
} from "../../static/image-imports";
import { AnimalType } from "./../types/animals";
import { AnimalImage, Image } from "../types/image";
import { Staff } from "global/types/staff";
import { Animal } from "global/types/animals";
import { Exhibit } from "global/types/exhibit";
import { AppState } from "global/state/state";

const localStorageKey: string = "zoo-manager-storage";
const autoSaveDelay: number = 2000; // 2 seconds

interface StoreInitialState {
  animals: Map<string, Animal>;
  exhibits: Map<string, Exhibit>;
  staff: Map<string, Staff>;
  images: Map<string, Image>;
  settings: Settings;
}

const images = [
  seagull1,
  tiger1,
  cheetah1,
  elephant1,
  gorilla1,
  lion1,
  parrot1,
  toucan1,
  wolf1,
  antelope1,
  zebra1,
];

const initialState = {
  animals: [
    new Animal("1", AnimalType.antelope, "Bethy", "", ""),
    new Animal("2", AnimalType.cheetah, "Spot", "", "", cheetah1.id),
    new Animal("3", AnimalType.elephant, "Prince", "", "", elephant1.id),
    new Animal("4", AnimalType.gorilla, "Mike", "", "", gorilla1.id),
    new Animal("5", AnimalType.lion, "Soot", "", "", lion1.id),
    new Animal("6", AnimalType.parrot, "Popper", "", "", parrot1.id),
    new Animal("7", AnimalType.tiger, "Kris", "", ""),
    new Animal("8", AnimalType.lion, "Larry", "", ""),
    new Animal("9", AnimalType.mouse, "Spot", "", ""),
  ],
  exhibits: [new Exhibit("b", ["1"], ["a"], "Purple Rose", "")],
  staff: [new Staff("a", [], "Larry", "20000", "")],
  images: images,
  settings: new Settings(""),
};

export class StoreInitialiser {
  public animals: Map<string, Animal>;
  public exhibits: Map<string, Exhibit>;
  public staff: Map<string, Staff>;
  public images: Map<string, Image>;
  public settings: Settings;
  constructor() {
    const localStorageLoadSuccessful = this.loadFromLocalStorage();
    if (!localStorageLoadSuccessful) {
      this.loadFromInitialState();
    }
  }

  public getInitialState(): StoreInitialState {
    return {
      animals: this.animals,
      exhibits: this.exhibits,
      staff: this.staff,
      images: this.images,
      settings: this.settings,
    };
  }

  private loadFromLocalStorage(): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    const storedValue = localStorage.getItem(localStorageKey);
    const parsedValue = !!storedValue ? JSON.parse(storedValue) : undefined;

    if (
      parsedValue &&
      parsedValue.animals &&
      parsedValue.exhibits &&
      parsedValue.staff &&
      parsedValue.settings
    ) {
      this.animals = convertArrayToMap(parsedValue.animals, Animal.clone);
      this.exhibits = convertArrayToMap(parsedValue.exhibits, Exhibit.clone);
      this.staff = convertArrayToMap(parsedValue.staff, Staff.clone);
      this.images = this.loadImagesFromInitialState();
      this.settings = Settings.clone(parsedValue.settings);
      if (
        !!this.animals &&
        !!this.exhibits &&
        !!this.staff &&
        !!this.images &&
        !!this.settings
      ) {
        return true;
      }
    }

    return false;
  }

  private loadFromInitialState() {
    this.animals = convertArrayToMap(initialState.animals, Animal.clone);
    this.exhibits = convertArrayToMap(initialState.exhibits, Exhibit.clone);
    this.staff = convertArrayToMap(initialState.staff, Staff.clone);
    this.images = this.loadImagesFromInitialState();
    this.settings = initialState.settings;
  }

  private loadImagesFromInitialState(): Map<string, Image> {
    return convertArrayToMap(initialState.images, AnimalImage.clone);
  }
}

const convertArrayToMap = (
  values: any[],
  conversionFunction: (value: any) => any
): Map<string, any> | undefined => {
  const newMap = new Map<string, any>();

  if (!values) {
    return newMap;
  }

  values.forEach((value: any): void => {
    if (value.id) {
      newMap.set(value.id, conversionFunction(value));
    } else {
      console.error("Unable to parse Animal, resetting to default!");
      return undefined;
    }
  });

  return newMap;
};

export class SaveElement {
  private savingAllowed = true;
  private changedSinceLastSave = false;
  private latestState: AppState;

  public stateChanged(state: AppState) {
    this.latestState = state;
    if (this.savingAllowed) {
      this.save();
    } else {
      this.changedSinceLastSave = true;
    }

    return {};
  }

  public startTimer(): void {
    this.savingAllowed = false;
    window.setTimeout(() => {
      if (this.changedSinceLastSave) {
        this.save();
      } else {
        this.savingAllowed = true;
      }
    }, autoSaveDelay);
  }

  public save() {
    if (typeof window !== "undefined") {
      const animals = Array.from(this.latestState.animals.values());
      const exhibits = Array.from(this.latestState.exhibits.values());
      const staff = Array.from(this.latestState.staff.values());
      const settings = this.latestState.settings;
      const saveString = JSON.stringify({
        animals,
        exhibits,
        staff,
        settings,
      });

      localStorage.setItem(localStorageKey, saveString);
      this.changedSinceLastSave = false;
      this.startTimer();
    } else {
      console.warn("local storage is undefined. Skipping save operation");
    }
  }
}
