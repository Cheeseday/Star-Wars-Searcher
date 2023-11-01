import React from 'react';
import './searchBar.scss';
import Button from '../button/Button';

// type MyProps = {
//   disabled: boolean;
// };
type Props = {
  // charactersList: object[];
  searchHandler: () => Promise<void>;
};

class SearchBar extends React.Component<Props> {
  // state: State = {
  //   count: 0,
  //   // charactersList: [],
  // };
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { searchHandler } = this.props;
    return (
      <section className="searchBar">
        <div className="searchLine">
          <input placeholder="Enter someone from the Star Wars universe"></input>
          <Button
            disabled={false}
            text="Search"
            // class="searchButton"
            click={searchHandler}
          ></Button>
        </div>
      </section>
    );
  }
}

export default SearchBar;
