import { useRef } from "react";
import { Component } from "../../types/component";
import { InputChangeEvent } from "../../types/events";

import cn from "../../libs/class-name";

export interface Props extends Component {
  name: string;
  value?: number | string;
  onChange?: (e: InputChangeEvent) => void;
}

const InputField = ({ name, value, onChange, classNames = [] }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("InputField", [], classNames)}>
      <input ref={ref} type="number" name={name} onChange={onChange} onFocus={(e) => e.target.select()} value={value} />
    </div>
  );
};

export default InputField;
