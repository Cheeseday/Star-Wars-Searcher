import React from 'react';
import './card.scss';
import { Outlet } from 'react-router-dom';

type Props = {
  name: string;
  imageUrl: string;
  cardClickHandler: (name: string) => void;
};

const Card: React.FC<Props> = (props) => {
  const { name, imageUrl, cardClickHandler } = props;
  return (
    <article className="card" onClick={() => cardClickHandler(name)}>
      <p className="cardName">{name}</p>
      <img
        src={imageUrl}
        alt={name}
        loading="lazy"
        height={220}
        width={'100%'}
      ></img>
      <Outlet />
    </article>
  );
};

export default Card;
