import CharactersList from '../charactersList/CharactersList';
import SearchBar from '../searchBar/SearchBar';
import './layout.scss';
import React, { Fragment } from 'react';

class Layout extends React.Component {
  render() {
    return (
      <Fragment>
        <main>
          <SearchBar />
          <CharactersList />
        </main>
      </Fragment>
    );
  }
}

export default Layout;
