import React from "react";
import cn from "../../libs/class-name";
import { Component } from "../../types/component";
import { motion, useAnimate } from "framer-motion";

export interface Props extends Component {
  name: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ name, label, classNames, onClick }: Props) => {
  const [scope, animate] = useAnimate();

  function sequence() {
    animate(
      [
        [scope.current, { scale: 0.95, boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.7)" }],
        [scope.current, { scale: 1, boxShadow: "0 0 0 10px rgba(0, 0, 0, 0)" }],
        [scope.current, { scale: 0.95, boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)" }]
      ],
      { duration: 0.3 }
    );
  }

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    sequence();
  };

  return (
    <>
      <button ref={scope} className={cn("Button", [], classNames)} name={name} onClick={handleOnClick}>
        {label}
      </button>
    </>
  );
};

export default Button;
