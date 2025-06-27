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

  const { firstNumber, secondNumber, operator } = state;

  const result =
    firstNumber !== null && secondNumber !== null && operator !== ""
      ? `${firstNumber} ${operator} ${secondNumber}`
      : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">
        {result ?? `${firstNumber ?? ""} ${operator} ${secondNumber ?? ""}`}
      </h1>
      <div className="grid grid-cols-4 gap-3 max-w-[300px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "*", "/", "=", "C"].map(
          (item, index) => (
            <Button
              handleClick={() => handleClick(item)}
              key={index}
              className={`
    w-16 h-16 m-1 rounded text-white font-semibold text-lg transition duration-200
    ${
      typeof item === "number"
        ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
        : item === "="
        ? "bg-green-600 hover:bg-green-700 active:bg-green-800"
        : item === "C"
        ? "bg-red-600 hover:bg-red-700 active:bg-red-800"
        : "bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800"
    }
  `}
            >
              {item}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default App;
