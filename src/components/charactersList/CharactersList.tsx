import React from 'react';
import './charactersList.scss';
import Card from '../card/Card';

type CharacterType = {
  name: string;
  imageUrl: string;
  films: string[];
};
type Props = {
  charactersList: object[];
};

const CharactersList: React.FC<Props> = (props) => {
  return (
    <section className="cardBlock">
      {props.charactersList.map((item: CharacterType, index: number) => {
        return (
          <Card
            key={index}
            name={item.name}
            imageUrl={item.imageUrl}
            films={item.films}
          ></Card>
        );
      })}
    </section>
  );
};

export default CharactersList;
