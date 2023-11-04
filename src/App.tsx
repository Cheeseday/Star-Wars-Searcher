import React, { Fragment, useState, useEffect, ChangeEvent } from 'react';
import './App.scss';
import Loader from './components/loader/Loader';
import SearchBar from './components/searchBar/SearchBar';
import CharactersList from './components/charactersList/CharactersList';
import Pagination from './components/pagination/Pagination';

type CharacterType = {
  info: { totalPages: number; count: number };
  data: object[];
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNewRequest, setIsNewRequest] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [charactersList, setCharactersList] = useState([{}]);
  const [totalCount, setTotalCount] = useState(82);
  const [siblingCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('20');
  const inputValueHandler = (): void => {
    if (event) setInputValue((event.target as HTMLInputElement)?.value);
  };
  useEffect(() => {
    searchHandler(1, 1, '20');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const searchHandler = (
    page = 1,
    changeReqCode = 1,
    sizeOfPage = pageSize
  ): void => {
    setIsLoading(true);
    if (changeReqCode) {
      setIsNewRequest(true);
      setCurrentPage(1);
    }
    setCharactersList([]);
    const queryString = getQueryString(page, sizeOfPage);
    getCharacters(queryString, setIsLoading).then((response) => {
      setCharactersList(response.data);
      setTotalCount(response.info.totalPages * response.info.count);
      setIsNewRequest(false);
    });
  };
  const getQueryString = (page: number, pageSize: string): string => {
    let queryString = '';
    queryString = `?page=${page}&pageSize=${pageSize}`;
    const querySearchParam = getSearchKey();
    if (querySearchParam && !inputValue) {
      queryString += `&name=${querySearchParam}`;
    } else if (inputValue) {
      queryString += `&name=${inputValue}`;
      localStorage.setItem('nameKey', JSON.stringify(inputValue));
    }
    return queryString;
  };
  const pageChangeHandler = (page: number): void => {
    const changeReqCode = 0;
    setCurrentPage(page);
    searchHandler(page, changeReqCode);
  };
  const getSearchKey = (): string => {
    const value = localStorage.getItem('nameKey');
    return typeof value === 'string' ? JSON.parse(value) : '';
  };

  const pageSizeChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    let pageSize = '10';
    if (event) {
      pageSize = event?.target?.value;
      setPageSize(pageSize);
    }
    const changeReqCode = 0;
    searchHandler(1, changeReqCode, pageSize);
  };
  return (
    <Fragment>
      <main>
        <SearchBar
          searchHandler={searchHandler}
          inputValueHandler={inputValueHandler}
        />
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <CharactersList charactersList={charactersList} />
            </div>
          )}
        </div>
        <div>
          {isNewRequest ? (
            <div></div>
          ) : (
            <Pagination
              className="paginationBar"
              totalCount={totalCount}
              currentPage={currentPage}
              siblingCount={siblingCount}
              pageSize={pageSize}
              onPageChange={(page) => pageChangeHandler(page)}
              onPageSizeChange={(event) => pageSizeChangeHandler(event)}
            />
          )}
        </div>
      </main>
    </Fragment>
  );
};

async function getCharacters(
  value: string,
  loadingSetter: React.Dispatch<React.SetStateAction<boolean>>
): Promise<CharacterType> {
  const url = `https://api.disneyapi.dev/character${value}`;
  const answer: CharacterType = await fetch(`${url}`)
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
