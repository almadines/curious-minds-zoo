import * as React from "react";
import { connect } from "react-redux";
import { Staff } from "global/types/staff";
import { AnimalType } from "global/types/animals";
import { Animal } from "global/types/animals";
import { Exhibit } from "global/types/exhibit";
import { AppState } from "global/state/state";

const localStorageKey: string = "zoo-manager-storage";
const autoSaveDelay: number = 30000; // 30 seconds

interface StoreInitialState {
  animals: Map<string, Animal>;
  exhibits: Map<string, Exhibit>;
  staff: Map<string, Staff>;
}

const initialState = {
  animals: [
    new Animal("1", AnimalType.bird, "Bethy", "Female", ""),
    new Animal("2", AnimalType.cat, "Bin Chicken", "Male", ""),
    new Animal("3", AnimalType.dog, "Prince", "Male", ""),
    new Animal("4", AnimalType.dog, "Antei", "Male", ""),
    new Animal("5", AnimalType.cat, "Soot", "Female", ""),
    new Animal("6", AnimalType.cat, "Kipper", "Female", ""),
    new Animal("7", AnimalType.cat, "Gus", "Male", ""),
    new Animal("8", AnimalType.lion, "Larry", "Female", ""),
    new Animal("9", AnimalType.mouse, "Spot", "Male", ""),
    new Animal("10", AnimalType.mouse, "Kris", "Female", ""),
  ],
  exhibits: [new Exhibit("b", ["1"], ["a"], "Purple Rose", "")],
  staff: [new Staff("a", [], "Larry", "20000", "")],
};

export class StoreInitialiser {
  public animals: Map<string, Animal>;
  public exhibits: Map<string, Exhibit>;
  public staff: Map<string, Staff>;
  constructor() {
    // const localStorageLoadSuccessful = this.loadFromLocalStorage();
    // if (!localStorageLoadSuccessful) {
    this.loadFromInitialState();
    // }
  }

  public getInitialState(): StoreInitialState {
    return {
      animals: this.animals,
      exhibits: this.exhibits,
      staff: this.staff,
    };
  }

  private loadFromLocalStorage(): boolean {
    if (typeof window === undefined) {
      console.log("window undefined, skipping load from local storage");
      return false;
    }

    const storedValue = localStorage.getItem(localStorageKey);
    const parsedValue = !!storedValue ? JSON.parse(storedValue) : undefined;

    if (
      parsedValue &&
      parsedValue.animals &&
      parsedValue.exhibits &&
      parsedValue.staff
    ) {
      this.animals = convertArrayToMap(parsedValue.animals, Animal.clone);
      this.exhibits = convertArrayToMap(parsedValue.exhibits, Exhibit.clone);
      this.staff = convertArrayToMap(parsedValue.staff, Staff.clone);
      if (!!this.animals && !!this.exhibits && !!this.staff) {
        return true;
      }
    }

    return false;
  }

  private loadFromInitialState() {
    this.animals = convertArrayToMap(initialState.animals, Animal.clone);
    this.exhibits = convertArrayToMap(initialState.exhibits, Exhibit.clone);
    this.staff = convertArrayToMap(initialState.staff, Staff.clone);
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
    console.log("map state to props in Save Element called!");
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
    if (typeof window !== undefined) {
      const animals = Array.from(this.latestState.animals.values());
      const exhibits = Array.from(this.latestState.exhibits.values());
      const staff = Array.from(this.latestState.staff.values());
      const saveString = JSON.stringify({
        animals,
        exhibits,
        staff,
      });
      console.log("saving data: ", saveString);

      localStorage.setItem(localStorageKey, saveString);
      this.changedSinceLastSave = false;
      this.startTimer();
    } else {
      console.warn("local storage is undefined. Skipping save operation");
    }
  }
}
