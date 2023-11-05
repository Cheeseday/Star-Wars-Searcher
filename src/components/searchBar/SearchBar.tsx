import React from 'react';
import './searchBar.scss';
import Button from '../button/Button';
import ErrorButton from '../errorButton/ErrorButton';

type SearchBarPropsType = {
  searchHandler: void | (() => void);
  inputValueHandler: () => void;
};

const SearchBar: React.FC<SearchBarPropsType> = (props) => {
  return (
    <section className="searchBar">
      <div className="searchLine">
        <input
          id="name"
          name="name"
          type="search"
          placeholder="Enter someone from the Star Wars universe"
          onChange={props.inputValueHandler}
        ></input>
        <Button
          disabled={false}
          text="Search"
          click={props.searchHandler}
        ></Button>
        <ErrorButton />
      </div>
    </section>
  );
};

export default SearchBar;
