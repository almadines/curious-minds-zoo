import { ValueType } from "./../state/state";
import { ActionType, DispatchAction, IdObject } from "./dispatchActions";

// There's probably a better way of doing this but this'll work for now
export function createMapReducer<T extends IdObject>(
  valueTypeFilterString: string,
  getValue: (item: ValueType) => T | undefined
): (oldState: Map<string, T>, action: DispatchAction) => Map<string, T> {
  return (oldState: Map<string, T>, action: DispatchAction): Map<string, T> => {
    if (!oldState) {
      return new Map<string, T>();
    }

    if (!action.names) {
      // most likely an init action
      return oldState;
    }

    if (!action.names.includes(valueTypeFilterString)) {
      return oldState;
    }

    const newState = new Map(oldState);
    let hasChanged: boolean = false;

    switch (action.type) {
      case ActionType.upsert:
      case ActionType.add:
        action.values.forEach((item: ValueType) => {
          const value = getValue(item);
          if (!!value) {
            hasChanged = true;
            newState.set(value.id, value);
          }
        });
        break;
      case ActionType.remove:
        action.values.forEach((item: ValueType) => {
          const value = getValue(item);
          if (!!value) {
            hasChanged = true;
            newState.delete(value.id);
          }
        });
        break;
      default:
        console.warn(
          "Action type not recognised: ",
          action.type,
          " from action: ",
          action
        );
    }

    if (hasChanged) {
      return newState;
    }

    return oldState;
  };
}
