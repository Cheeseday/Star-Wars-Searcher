import React, { Fragment, useState, useEffect } from 'react';
import './App.scss';
import Loader from './components/loader/Loader';
import SearchBar from './components/searchBar/SearchBar';
import CharactersList from './components/charactersList/CharactersList';
import Pagination from './components/pagination/Pagination';
import { flushSync } from 'react-dom';

type ResponseType = {
  results: string[];
  count: number;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [charactersList, setCharactersList] = useState(['']);
  const [totalCount, setTotalCount] = useState(82);
  const [siblingCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
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
    const currentPageNumber = currentPage > 0 ? currentPage : 1;
    console.log(currentPage);
    let queryString = `?page=${currentPageNumber}`;
    const querySearchParam = getSearchKey();
    if (querySearchParam && !inputValue) {
      queryString += `&search=${querySearchParam}`;
    } else if (inputValue) {
      queryString += `&search=${inputValue}`;
      localStorage.setItem('searchKey', JSON.stringify(inputValue));
    }
    getResponse(queryString, setIsLoading).then((response) => {
      setCharactersList(response.results);
      setTotalCount(response.count);
    });
  };
  const pageChangeHandler = (page: number): void => {
    flushSync(() => setCurrentPage(page));
    // setCurrentPage(page); //force update
    searchHandler();
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
        <Pagination
          className="paginationBar"
          totalCount={totalCount}
          currentPage={currentPage}
          siblingCount={siblingCount}
          pageSize={pageSize}
          onPageChange={(page) => pageChangeHandler(page)}
        />
      </main>
      <div>{isLoading ? <Loader /> : <div></div>}</div>
    </Fragment>
  );
};

async function getResponse(
  value: string,
  loadingSetter: React.Dispatch<React.SetStateAction<boolean>>
): Promise<ResponseType> {
  const url = `https://swapi.dev/api/people/${value}`;
  // const url = `https://swapi.dev/api/people/${value}&page=5`;
  let answer: ResponseType = {
    results: [],
    count: 0,
  };
  answer = await fetch(`${url}`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((e: Error) => {
      console.log(e.message);
      return {};
    });
  loadingSetter(false);
  return answer;
}

export default App;
