import React from 'react';
import './card.scss';

type Props = {
  name: string;
  imageUrl: string;
  // films: string[];
};

const Card: React.FC<Props> = (props) => {
  const { name, imageUrl } = props;
  return (
    <article className="card">
      <p className="cardName">{name}</p>
      <img
        src={imageUrl}
        alt={name}
        loading="lazy"
        height={220}
        width={'100%'}
      ></img>
    </article>
  );
};

export default Card;
