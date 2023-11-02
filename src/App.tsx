import React, { Fragment, useState, useEffect } from 'react';
import './App.scss';
import Loader from './components/loader/Loader';
import SearchBar from './components/searchBar/SearchBar';
import CharactersList from './components/charactersList/CharactersList';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [charactersList, setCharactersList] = useState(['']);
  const inputValueHandler = (): void => {
    if (event) setInputValue((event.target as HTMLInputElement)?.value);
  };
  useEffect(() => {
    searchHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const searchHandler = (): void => {
    setIsLoading(true);
    setCharactersList([]);

    let search = '';
    const lastSearch = getSearchKey();
    if (lastSearch) {
      search = `?search=${lastSearch}`;
    }
    if (inputValue) {
      search = `?search=${inputValue}`;
      localStorage.setItem('searchKey', JSON.stringify(inputValue));
    }
    getCharacters(search, setIsLoading).then((value) =>
      setCharactersList(value)
    );
  };
  const getSearchKey = (): string => {
    const value = localStorage.getItem('searchKey');
    return typeof value === 'string' ? JSON.parse(value) : '';
  };
  return (
    <Fragment>
      <main>
        <SearchBar
          searchHandler={searchHandler}
          inputValueHandler={inputValueHandler}
        />
        <CharactersList charactersList={charactersList} />
      </main>
      <div>{isLoading ? <Loader /> : <div></div>}</div>
    </Fragment>
  );
};

async function getCharacters(
  value: string,
  loadingSetter: React.Dispatch<React.SetStateAction<boolean>>
): Promise<Array<string>> {
  const url = `https://swapi.dev/api/people/${value}`;
  let charactersList: Array<string> = [];
  charactersList = await fetch(`${url}`)
    .then((response) => response.json())
    .then((response) => {
      return response.results;
    })
    .catch((e: Error) => {
      console.log(e.message);
      return [];
    });
  loadingSetter(false);
  return charactersList;
}

export default App;
