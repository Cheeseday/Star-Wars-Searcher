import React, { Fragment, useState, useEffect, ChangeEvent } from 'react';
import './App.scss';
import Loader from './components/loader/Loader';
import SearchBar from './components/searchBar/SearchBar';
import CharactersList from './components/charactersList/CharactersList';
import Pagination from './components/pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import Details from './components/details/Details';

type CharacterType = {
  info: { totalPages: number; count: number };
  data:
    | {
        name: string;
        films: string[];
        tvShows: string[];
        videoGames: string[];
      }[]
    | {
        name: string;
        films: string[];
        tvShows: string[];
        videoGames: string[];
      };
};

type CardType = {
  name: string;
  films: string[];
  tvShows: string[];
  videoGames: string[];
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isShownDetails, setIsShownDetails] = useState(false);
  const [isNewRequest, setIsNewRequest] = useState(false);
  const [currentCard, setCurrentCard] = useState({
    name: '',
    films: [''],
    tvShows: [''],
    videoGames: [''],
  });
  const [inputValue, setInputValue] = useState('');
  const [charactersList, setCharactersList] = useState([
    { name: '', films: [''], tvShows: [''], videoGames: [''] },
  ]);
  const [totalCount, setTotalCount] = useState(1);
  const [siblingCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('20');
  const navigate = useNavigate();
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
    getCharacters(queryString, setIsLoading)
      .then((response) => {
        Array.isArray(response.data)
          ? setCharactersList(response.data)
          : setCharactersList([response.data]);
        console.log(charactersList);
        setTotalCount(response.info.totalPages * +sizeOfPage);
        setIsNewRequest(false);
      })
      .catch((e) => console.log(e.stack));
  };
  const getQueryString = (page: number, pageSize: string): string => {
    let queryString = '';
    let searchString = '';
    queryString = `?page=${page}&pageSize=${pageSize}`;
    const querySearchParam = getSearchKey();
    if (querySearchParam && !inputValue) {
      queryString += `&name=${querySearchParam}`;
      searchString = querySearchParam;
    } else if (inputValue) {
      queryString += `&name=${inputValue}`;
      searchString = inputValue;
      localStorage.setItem('nameKey', JSON.stringify(inputValue));
    }
    setNavigation(page, searchString);
    return queryString;
  };
  const setNavigation = (page: number | string, searchString: string) => {
    typeof page === 'string'
      ? navigate({
          search: `name=${searchString}&page=${currentPage}`,
        })
      : navigate({
          search: `name=${searchString}&page=${page}`,
        });
  };
  const getSearchKey = (): string => {
    const value = localStorage.getItem('nameKey');
    return typeof value === 'string' ? JSON.parse(value) : '';
  };
  const pageChangeHandler = (page: number): void => {
    const changeReqCode = 0;
    setCurrentPage(page);
    searchHandler(page, changeReqCode);
  };
  const pageSizeChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    let pageSize = '10';
    if (event) {
      pageSize = event?.target?.value;
      setPageSize(pageSize);
    }
    const changeReqCode = 1;
    searchHandler(1, changeReqCode, pageSize);
  };
  const cardClickHandler = (name: string): void => {
    const currentCard = charactersList.find((value) => {
      if (value.name === name) {
        return value;
      }
    });
    let cardDescription: CardType;
    if (currentCard) {
      cardDescription = {
        name,
        films: currentCard.films,
        tvShows: currentCard.tvShows,
        videoGames: currentCard.videoGames,
      };
      setCurrentCard(cardDescription);
    }
    setIsShownDetails(!isShownDetails);
  };
  const closeDetailsHandler = (): void => {
    if (isShownDetails) {
      setIsShownDetails(false);
    }
  };
  return (
    <Fragment>
      <main id="main">
        <SearchBar
          searchHandler={searchHandler}
          inputValueHandler={inputValueHandler}
          closeDetailsHandler={closeDetailsHandler}
        />
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <CharactersList
                charactersList={charactersList}
                cardClickHandler={cardClickHandler}
                closeDetailsHandler={closeDetailsHandler}
              />
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
      {!isShownDetails ? (
        <div></div>
      ) : (
        <Details
          details={currentCard}
          closeDetailsHandler={closeDetailsHandler}
        ></Details>
      )}
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
      return { totalPages: 0, count: 0 };
    });
  loadingSetter(false);
  return answer;
}
