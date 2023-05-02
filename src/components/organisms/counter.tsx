import { FC, useReducer } from "react";
import { countInit, countReducer } from "../../reducers/count";

export const Counter: FC<{ initialCount: number }> = ({ initialCount }) => {
  const [state, dispatch] = useReducer(countReducer, initialCount, countInit);
  return (
    <>
      Total : {state.count}
      <div>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
      </div>
      <button
        onClick={() => dispatch({ type: "reset", payload: initialCount })}
      >
        Réinitialiser
      </button>
    </>
  );
};
