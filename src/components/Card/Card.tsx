import React from "react";
import cn from "../../libs/class-name";
import { Component } from "../../types/component";

import Button from "../Button/Button";
import InputField from "../InputField/InputField";

export interface Props extends Component {
  counter: number | string;
  date: string;
  name: string;
  title: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDecrease?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onIncrease?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Card = ({ counter, date, title, name, value, classNames, onChange, onDecrease, onIncrease }: Props) => {
  return (
    <div className={cn("Card", [], classNames)}>
      <div className="Card__title">{title.replace("ue", "ü")}</div>
      <div className="Card__counter">{counter}</div>

      <div className="Card__options">
        <div className="Card__options-input">
          <InputField onChange={onChange} value={value} name={name} />
        </div>

        <div className="Card__options-lastChange">
          <p>Zuletzt geändert am: </p>
          {date}
        </div>

        <div className="Card__options-buttons">
          <Button label="-" name={name} onClick={onDecrease} />
          <Button label="+" name={name} onClick={onIncrease} />
        </div>
      </div>
    </div>
  );
};

export default Card;
