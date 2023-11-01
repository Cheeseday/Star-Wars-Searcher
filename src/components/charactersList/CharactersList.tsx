import React from 'react';
import './charactersList.scss';

type RespObject = {
  name: string;
  gender: string;
};
type Props = {
  charactersList: RespObject[];
};

class CharactersList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { charactersList } = this.props;
    return (
      <div>
        <ul>
          {charactersList.map((item, index) => {
            return <li key={index}>{item?.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default CharactersList;
