import React from 'react';
import './card.scss';
import { AppContext } from '../../context/AppContext';

interface Props {
  children: string;
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
  homeworld?: string;
  hair_color?: string;
  skin_color?: string;
  starships?: string[];
}

class Card extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  static context = AppContext;

  render() {
    const { name, birth_year, gender, height, mass, skin_color, hair_color } =
      this.props;
    return (
      <article className="card">
        <p className="cardName">{name}</p>
        <p className="cardBirthYear">Birth year: {birth_year}</p>
        <p className="cardGender">Gender: {gender}</p>
        <p className="cardHeight">Height: {height}</p>
        <p className="cardWeight">Weight: {mass}</p>
        <p className="cardSkinColor">Skin color: {skin_color}</p>
        <p className="cardHairColor">Hair color: {hair_color}</p>
      </article>
    );
  }
}

Card.contextType = AppContext;

export default Card;
