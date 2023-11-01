import React from 'react';
import './App.scss';
import Layout from './components/layout/Layout';
import Loader from './components/loader/Loader';
import { AppContext } from './context/AppContext';

interface AppProps {}

interface AppState {
  isLoading: boolean;
  inputValue: string;
  charactersList: object;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.searchHandler = this.searchHandler.bind(this);
    this.state = {
      inputValue: '',
      charactersList: [],
      isLoading: false,
    };
  }
  async searchHandler(): Promise<void> {
    this.setState({
      isLoading: true,
      charactersList: [],
    });
    let search = '';
    const lastSearch = this.getSearchKey();
    if (lastSearch) {
      search = `${lastSearch}`;
    }
    if (this.state.inputValue) {
      search = `?search=${this.state.inputValue}`;
      localStorage.setItem('searchKey', JSON.stringify(search));
    }
    const url = `https://swapi.dev/api/people/${search}`;
    await fetch(`${url}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          charactersList: response.results,
          isLoading: false,
        });
      })
      .catch((e: Error) => console.log(e.message));
  }
  inputValueHandler = (event: KeyboardEvent): void => {
    this.setState({
      inputValue: (event.target as HTMLInputElement)?.value,
    });
  };

  getSearchKey(): string | null {
    let lastSearch: string | null = null;
    const value = localStorage.getItem('searchKey');
    if (typeof value === 'string') {
      lastSearch = JSON.parse(value);
    }
    return lastSearch;
  }

  componentDidMount(): void {
    this.searchHandler();
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          searchHandler: this.searchHandler,
          inputValueHandler: this.inputValueHandler,
        }}
      >
        <Layout />
        <div>{this.state.isLoading ? <Loader /> : <div></div>}</div>
      </AppContext.Provider>
    );
  }
}

export default App;
