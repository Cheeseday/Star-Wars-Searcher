import React from 'react';
import './details.scss';
import Button from '../button/Button';

type DetailsProps = {
  details: {
    name: string;
    tvShows: string[];
    films: string[];
    videoGames: string[];
  };
  closeDetailsHandler: () => void;
};

const Details: React.FC<DetailsProps> = (props) => {
  const { name = 'Details', tvShows, films, videoGames } = props.details;
  return (
    <aside className="details">
      <h2 className="detailsName">{name}</h2>
      {films ? (
        <ul>
          Films:
          {films.map((value: string, index: number) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
      ) : (
        <></>
      )}
      {tvShows ? (
        <ul>
          TV shows:
          {tvShows.map((value: string, index: number) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
      ) : (
        <></>
      )}
      {videoGames ? (
        <ul>
          Video games:
          {videoGames.map((value: string, index: number) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
      ) : (
        <></>
      )}
      <Button
        disabled={false}
        text="Close Details"
        click={props.closeDetailsHandler}
      />
    </aside>
  );
};

export default Details;
