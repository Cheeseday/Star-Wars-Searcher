import React, { ComponentProps } from 'react';
import './loader.scss';

interface Props extends ComponentProps<'div'> {}

class Loader extends React.Component<Props> {
  render() {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Loader;
