import React from "react";
import cn from "../../lib/class-name";
import { Component } from "../../types/component";

export interface Props extends Component {
  children: React.ReactNode;
}

const Card = ({ children, classNames }: Props) => {
  return <div className={cn("CardLayout", [], classNames)}>{children}</div>;
};

export default Card;
