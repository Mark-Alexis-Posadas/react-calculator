import { useReducer } from "react";
import { Button } from "./components/Button";

interface State {
  initialValue: number;
}

type Action =
  | { type: "PLUS"; payload: number }
  | { type: "MINUS"; payload: number }
  | { type: "RESET" };

const initialState: State = {
  initialValue: 0,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "PLUS":
      return { ...state, initialValue: state.initialValue + action.payload };
    case "MINUS":
      return { ...state, initialValue: state.initialValue - action.payload };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (value: string | number) => {
    if (typeof value === "number") {
      dispatch({ type: "PLUS", payload: value });
    } else if (value === "-") {
      dispatch({ type: "MINUS", payload: 1 }); // for demo purposes
    } else if (value === "+") {
      dispatch({ type: "PLUS", payload: 1 }); // for demo purposes
    } else if (value === "C") {
      dispatch({ type: "RESET" });
    }
  };

  return (
    <div>
      <h1>Value: {state.initialValue}</h1>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-", "*", "/"].map((item, index) => (
        <Button handleClick={handleClick} key={index}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default App;
