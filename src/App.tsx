import React from 'react';
import './App.scss';
import Layout from './components/layout/Layout';

type RespObject = {
  name: string;
  gender: string;
};

class App extends React.Component {
  charactersList: RespObject[];
  constructor(props: object) {
    super(props);
    this.charactersList = [
      { name: 'Anton', gender: 'male' },
      { name: 'Ant', gender: 'female' },
    ];
  }
  async searchHandler(): Promise<void> {
    const baseUrl = 'https://swapi.dev/api';
    await fetch(`${baseUrl}/people`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        this.charactersList = response.results;
        // this.setState({ charactersList: response.results });
      })
      .catch((e: Error) => console.log(e.message));
  }

  render() {
    return (
      <Layout
        charactersList={this.charactersList}
        searchHandler={this.searchHandler}
      />
    );
  }
}

export default App;
