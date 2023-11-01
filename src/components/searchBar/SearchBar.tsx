import React from 'react';
import './searchBar.scss';
import Button from '../button/Button';
import { AppContext } from '../../context/AppContext';
import ErrorButton from '../errorButton/ErrorButton';

class SearchBar extends React.Component {
  static context = AppContext;
  render() {
    const value = this.context;

    return (
      <section className="searchBar">
        <div className="searchLine">
          <input
            placeholder="Enter someone from the Star Wars universe"
            onChange={value.inputValueHandler}
          ></input>
          <Button
            disabled={false}
            text="Search"
            click={value.searchHandler}
          ></Button>
          <ErrorButton />
        </div>
      </section>
    );
  }
}

SearchBar.contextType = AppContext;

export default SearchBar;
