import React from 'react';
import './button.scss';

type Click = (arg?: string) => Promise<void> | undefined;

type MyProps = {
  disabled: boolean;
  text: string;
  click: Click;
  arg?: string;
};

type MyState = {
  count: number;
};

class Button extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
  }
  state: MyState = {
    count: 0,
  };

  render() {
    return (
      <button
        className="button"
        disabled={this.props.disabled}
        onClick={() =>
          this.props.click ? this.props.click(this.props.arg || '') : undefined
        }
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
