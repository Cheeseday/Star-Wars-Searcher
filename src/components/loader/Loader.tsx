import React from 'react';
import './loader.scss';

// interface Props extends ComponentProps<'div'> {}

const Loader: React.FC = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

// class Loader extends React.Component<Props> {
//   render() {
//     return (
//       <div className="lds-ring">
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//       </div>
//     );
//   }
// }

export default Loader;
