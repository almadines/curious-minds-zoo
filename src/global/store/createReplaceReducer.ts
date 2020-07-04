import { ValueType } from "./../state/state";
import { ActionType, DispatchAction, IdObject } from "./dispatchActions";

// There's probably a better way of doing this but this'll work for now
export function createReplaceReducer<T extends IdObject>(
  valueTypeFilterString: string,
  getValue: (item: ValueType) => T | undefined,
  defaultInitialState: T
): (oldState: T, action: DispatchAction) => T {
  return (oldState: T, action: DispatchAction): T => {
    if (!oldState) {
      return defaultInitialState;
    }

    if (!action.names) {
      // most likely an init action
      return oldState;
    }

    if (!action.names.includes(valueTypeFilterString)) {
      return oldState;
    }

    switch (action.type) {
      case ActionType.upsert:
      case ActionType.add:
        const values = action.values
          .map((value: ValueType): T | undefined => getValue(value))
          .filter((value: T | undefined): value is T => !!value);
        if (values.length !== 1) {
          console.error(
            "Expected only one input in create replace reducer type"
          );
        } else {
          return values[0];
        }
        break;
      case ActionType.remove:
        console.error("Invalid action passed into create replace reducer!");
        break;
      default:
        console.warn(
          "Action type not recognised: ",
          action.type,
          " from action: ",
          action
        );
    }

    return oldState;
  };
}
