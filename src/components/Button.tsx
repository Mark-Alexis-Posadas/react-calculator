import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleClick: (value: string | number) => void;
}

export const Button: FC<Props> = ({ children, handleClick }) => {
  return (
    <button onClick={() => handleClick(children as string | number)}>
      {children}
    </button>
  );
};
