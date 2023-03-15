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
      resultOn.length === 0 ? <h2>Nenhum álbum foi encontrado</h2>
        : (
          <div>
            <h4>
              { `Resultado de álbuns de: ${artist}` }
            </h4>
            <div>
              {resultOn.map(
                (result) => (
                  <div key={ result.collectionId }>
                    <img src={ result.artworkUrl100 } alt={ result.collectionName } />
                    <Link
                      to={ `/album/${result.collectionId}` }
                      data-testid={ `link-to-album-${result.collectionId}` }
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
        <form>
          <input
            data-testid="search-artist-input"
            name="artistInput"
            onChange={ this.inputChange }
            placeholder="Pesquisar"
            type="text"
            value={ valueOn }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ this.checkAble() }
            onClick={ this.handleClick }
          >
            Pesquisar
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
