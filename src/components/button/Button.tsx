import React from 'react';
import './button.scss';

type ClickType = (arg?: string) => Promise<void> | undefined;

type ButtonProps = {
  disabled: boolean;
  text: string;
  click: ClickType | (() => void) | void;
  arg?: string;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className="button"
      disabled={props.disabled}
      onClick={() => (props.click ? props.click(props.arg || '') : undefined)}
    >
      {props.text}
    </button>
  );
};

export default Button;
