import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleClick: (value: string | number) => void;
  className: string;
}

export const Button: FC<Props> = ({ children, handleClick, className }) => {
  return (
    <button
      className={className}
      onClick={() => handleClick(children as string | number)}
    >
      {children}
    </button>
  );
};
