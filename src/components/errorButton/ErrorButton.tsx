import React from 'react';
import './errorButton.scss';
import Button from '../button/Button';

interface Props {}

interface State {
  error: boolean;
}

class ErrorButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(): undefined {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      throw new Error('I crashed!');
    }
    return (
      <Button
        disabled={false}
        text="Throw an error"
        click={this.handleClick}
      ></Button>
    );
  }
}

export default ErrorButton;
