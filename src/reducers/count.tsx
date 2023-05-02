type ActionType = {
  type: string;
  payload?: number;
};
type StateType = {
  count: number;
};

export function countInit(initialCount: number) {
  return { count: initialCount };
}

export function countReducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return countInit(action.payload as number);
    default:
      throw new Error();
  }
}
