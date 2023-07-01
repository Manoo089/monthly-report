import { useRef } from "react";

import cn from "../../libs/class-name";
import { Component } from "../../types/component";

export interface Props extends Component {
  name: string;
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
