import React from 'react';
import './charactersList.scss';
import Card from '../card/Card';

type CharacterType = {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
  homeworld: string;
  hair_color?: string;
  skin_color?: string;
  starships?: string[];
};

type Props = {
  charactersList: string[];
};

const CharactersList: React.FC<Props> = (props) => {
  return (
    <section className="cardBlock">
      {props.charactersList.map((item: CharacterType, index: number) => {
        return (
          <Card
            key={index}
            name={item.name}
            birth_year={item?.birth_year}
            gender={item?.gender}
            height={item?.height}
            mass={item?.mass}
            hair_color={item?.hair_color}
            skin_color={item?.skin_color}
          >
            {item?.name}
          </Card>
        );
      })}
    </section>
  );
};

export default CharactersList;
