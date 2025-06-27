import { useReducer } from "react";
import { Button } from "./components/Button";

interface State {
  initialValue: number;
  firstNumber: number | string | null;
  secondNumber: number | string | null;
  operator: string;
}

type Action =
  | { type: "FIRST_NUMBER"; payload: number | string }
  | { type: "SECOND_NUMBER"; payload: number | string }
  | { type: "SET_OPERATOR"; payload: string }
  | { type: "CALCULATE" }
  | { type: "RESET" };

const initialState: State = {
  initialValue: 0,
  firstNumber: null,
  secondNumber: null,
  operator: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FIRST_NUMBER":
      return {
        ...state,
        firstNumber:
          state.firstNumber === null
            ? String(action.payload)
            : state.firstNumber + String(action.payload),
      };

    case "SECOND_NUMBER":
      return {
        ...state,
        secondNumber:
          state.secondNumber === null
            ? String(action.payload)
            : state.secondNumber + String(action.payload),
      };

    case "SET_OPERATOR":
      return {
        ...state,
        operator: action.payload,
      };

    case "CALCULATE":
      const num1 = Number(state.firstNumber);
      const num2 = Number(state.secondNumber);
      let result = state.initialValue;

      switch (state.operator) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "*":
          result = num1 * num2;
          break;
        case "/":
          result = num2 !== 0 ? num1 / num2 : 0;
          break;
        default:
          result = 0;
      }

      return {
        ...initialState,
        initialValue: result,
        firstNumber: result,
      };

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
      if (!state.operator) {
        dispatch({ type: "FIRST_NUMBER", payload: value });
      } else {
        dispatch({ type: "SECOND_NUMBER", payload: value });
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      dispatch({ type: "SET_OPERATOR", payload: value });
    } else if (value === "=") {
      dispatch({ type: "CALCULATE" });
    } else if (value === "C") {
      dispatch({ type: "RESET" });
    }
  };

  const { firstNumber, secondNumber, operator, initialValue } = state;

  const result =
    firstNumber !== null && secondNumber !== null && operator !== ""
      ? `${firstNumber} ${operator} ${secondNumber} = ${initialValue}`
      : null;

  return (
    <div>
      <h1 className="text-2xl mb-4">
        {result ?? `${firstNumber ?? ""} ${operator} ${secondNumber ?? ""}`}
      </h1>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "*", "/", "=", "C"].map(
        (item, index) => (
          <Button handleClick={() => handleClick(item)} key={index}>
            {item}
          </Button>
        )
      )}
    </div>
  );
};

export default App;
