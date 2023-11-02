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

// class Button extends React.Component<MyProps, MyState> {
//   constructor(props: MyProps) {
//     super(props);
//   }
//   state: MyState = {
//     count: 0,
//   };

//   render() {
//     return (
//       <button
//         className="button"
//         disabled={this.props.disabled}
//         onClick={() =>
//           this.props.click ? this.props.click(this.props.arg || '') : undefined
//         }
//       >
//         {this.props.text}
//       </button>
//     );
//   }
// }

export default Button;
