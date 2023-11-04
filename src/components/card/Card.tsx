import React from 'react';
import './card.scss';

type Props = {
  name: string;
  imageUrl: string;
  films: string[];
};

const Card: React.FC<Props> = (props) => {
  const { name, imageUrl, films } = props;
  return (
    <article className="card">
      <p className="cardName">{name}</p>
      <img src={imageUrl} alt={name}></img>
      <p>{films[0]}</p>
    </article>
  );
};

export default Card;
