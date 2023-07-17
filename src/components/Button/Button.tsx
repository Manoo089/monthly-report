import React from "react";
import cn from "../../lib/class-name";
import { Component } from "../../types/component";
import { ButtonOnClickEvent } from "../../types/events";
import { useAnimate } from "framer-motion";
import { pressedButtonAnimation } from "../../lib/animations";

export interface Props extends Component {
  id: string;
  name: string;
  label: string;
  onClick?: (e: ButtonOnClickEvent) => void;
}

const Button = ({ id, name, label, classNames, onClick }: Props) => {
  const [scope, animate] = useAnimate();

  const handleOnClick = (e: ButtonOnClickEvent) => {
    onClick?.(e);
    pressedButtonAnimation(animate, scope);
  };

  return (
    <>
      <button ref={scope} className={cn("Button", [], classNames)} id={id} name={name} onClick={handleOnClick}>
        {label}
      </button>
    </>
  );
};

export default Button;
