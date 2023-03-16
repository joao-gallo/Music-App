import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      valueOn: '',
      artist: '',
      resultOn: [],
      searching: false,
      searchLoading: false,
    };
  }

  handleClick = async () => {
    const { valueOn } = this.state;
    this.setState({ searchLoading: true, searching: true, artist: valueOn });
    const result = await searchAlbumsAPI(valueOn);
    this.setState({ valueOn: '', searchLoading: false, resultOn: result });
  }

  checkAble = () => {
    const { valueOn } = this.state;
    return (valueOn.length < 2);
  }

  inputChange = ({ target }) => {
    this.setState({ valueOn: target.value });
  }

  loaded = () => {
    const { searchLoading } = this.state;
    return (searchLoading ? <Loading className="search-loading" /> : null);
  }

  results() {
    const { resultOn, artist } = this.state;
    return (
      resultOn.length === 0 ? <h2 className='error'>Sorry, couldn't find this</h2>
        : (
          <div className='results'>
            <h4>
              { `Here, check these ${artist} albuns ` }
            </h4>
            <div className='results-search'>
              {resultOn.map(
                (result) => (
                  <div key={ result.collectionId }>
                    <img src={ result.artworkUrl100 } alt={ result.collectionName } />
                    <Link
                      to={ `/album/${result.collectionId}` }
                      data-testid={ `link-to-album-${result.collectionId}` }
                      className='results-link'
                    >
                      {result.collectionName}
                    </Link>
                  </div>
                ),
              )}
            </div>
          </div>
        )
    );
  }

  render() {
    const { valueOn, searching } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form className='search-father'>
          <input
          className='search-button'
            data-testid="search-artist-input"
            name="artistInput"
            onChange={ this.inputChange }
            placeholder="Search "
            type="text"
            value={ valueOn }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ this.checkAble() }
            onClick={ this.handleClick }
          >
            Search
          </button>
        </form>
        <div>
          {searching && this.loaded()}
          {searching && this.results()}
        </div>
      </div>
    );
  }
}

export default Search;
