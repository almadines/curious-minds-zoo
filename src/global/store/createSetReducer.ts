import { ValueType } from "./../state/state";
import { ActionType, DispatchAction, IdObject } from "./dispatchActions";

// There's probably a better way of doing this but this'll work for now
export function createSetReducer<T extends IdObject>(
  valueTypeFilterString: string,
  getValue: (item: ValueType) => T | undefined
): (oldState: T[], action: DispatchAction) => T[] {
  return (oldState: T[], action: DispatchAction): T[] => {
    if (!oldState) {
      return [];
    }

    if (!action.names.includes(valueTypeFilterString)) {
      return oldState;
    }

    const newState = [...oldState];
    let hasChanged: boolean = false;

    switch (action.type) {
      case ActionType.add:
        action.values.forEach((item: ValueType) => {
          const value = getValue(item); // can't seem to do instanceof T and have yet to find a better way
          if (!!value) {
            hasChanged = true;
            newState.push(value);
          }
        });
        break;
      case ActionType.remove:
        action.values.forEach((item: ValueType) => {
          const value = getValue(item);
          if (!!value) {
            hasChanged = true;
            newState.filter((elem: T): boolean => elem.id !== value.id);
          }
        });
        break;
      case ActionType.upsert:
        action.values.forEach((item: ValueType) => {
          const value = getValue(item);
          if (!!value) {
            hasChanged = true;
            newState.filter((elem: T): boolean => elem.id !== value.id);
            newState.push(value);
          }
        });
      default:
        console.warn(
          "Action type not recognised: ",
          action.type,
          " from action: ",
          action
        );
    }

    if (hasChanged) {
      return Array.from(new Set(newState)); // guarantee a set
    }

    return oldState;
  };
}
