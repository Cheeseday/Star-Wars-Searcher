import React from 'react';
import './loader.scss';

const Loader: React.FC = () => {
  return (
    <div className="loaderBlock">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
