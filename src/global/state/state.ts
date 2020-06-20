import { combineReducers } from "redux";
import { Animal } from "../types/animals";
import { Exhibit } from "../types/exhibit";
import { Staff } from "../types/staff";
import { createMapReducer } from "../store/createMapReducer";
import { Image } from "global/types/image";
import { Settings } from "global/types/settings";
import { createReplaceReducer } from "global/store/createReplaceReducer";

export interface AppState {
  animals: Map<string, Animal>;
  exhibits: Map<string, Exhibit>;
  staff: Map<string, Staff>;
  images: Map<string, Image>;
  settings: Settings;
}

export const combinedReducer = combineReducers({
  animals: createMapReducer<Animal>(Animal.name, (item: ValueType):
    | Animal
    | undefined => (item instanceof Animal ? item : undefined)),
  exhibits: createMapReducer<Exhibit>(Exhibit.name, (item: ValueType):
    | Exhibit
    | undefined => (item instanceof Exhibit ? item : undefined)),
  staff: createMapReducer<Staff>(Staff.name, (item: ValueType):
    | Staff
    | undefined => (item instanceof Staff ? item : undefined)),
  images: createMapReducer<Image>(Image.name, (item: ValueType):
    | Image
    | undefined => (item instanceof Image ? item : undefined)),
  settings: createReplaceReducer<Settings>(
    Settings.name,
    (item: ValueType): Settings | undefined =>
      item instanceof Settings ? item : undefined,
    new Settings("")
  ),
});

export type ValueType = Animal | Exhibit | Staff | Image | Settings;
