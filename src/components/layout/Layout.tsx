import CharactersList from '../charactersList/CharactersList';
import SearchBar from '../searchBar/SearchBar';
import './layout.scss';
import React, { Fragment } from 'react';

type RespObject = {
  name: string;
  gender: string;
};

type Props = {
  charactersList: RespObject[];
  searchHandler: () => Promise<void>;
};

class Layout extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { charactersList, searchHandler } = this.props;
    return (
      <Fragment>
        <main>
          <SearchBar searchHandler={searchHandler} />
          <CharactersList charactersList={charactersList} />
        </main>
      </Fragment>
    );
  }
}

export default Layout;
