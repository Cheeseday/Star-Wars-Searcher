import React from 'react';
import './charactersList.scss';
import { AppContext } from '../../context/AppContext';
import Card from '../card/Card';

interface Props {}

interface State {
  inputValue: string;
  charactersList: unknown[];
}

interface CharacterType {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
  homeworld: string;
  hair_color?: string;
  skin_color?: string;
  starships?: string[];
}

class CharactersList extends React.Component<Props, State> {
  static context = AppContext;
  render() {
    const value = this.context;
    return (
      <section className="cardBlock">
        {value.state.charactersList.map(
          (item: CharacterType, index: number) => {
            return (
              <Card
                key={index}
                name={item.name}
                birth_year={item?.birth_year}
                gender={item?.gender}
                height={item.height}
                mass={item.mass}
                hair_color={item.hair_color}
                skin_color={item.skin_color}
              >
                {item?.name}
              </Card>
            );
          }
        )}
      </section>
    );
  }
}
CharactersList.contextType = AppContext;

export default CharactersList;
