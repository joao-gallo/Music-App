import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      info: {},
      songList: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsList = await getMusics(id);
    const info = musicsList[0];
    this.setState({ musics: musicsList.slice(1), info });
    const favoritesSongs = await getFavoriteSongs();
    this.setState({ songList: favoritesSongs });
  }

  render() {
    const { musics, info, songList } = this.state;
    const { artistName, collectionName } = info;
    return (
      <div data-testid="page-album" className='music-page'>
        <Header />
        <div className='music-list'>
          <h2>Artist:</h2>
          <h3 data-testid="artist-name">{artistName}</h3>
          <h2>Album:</h2>
          <h3 data-testid="album-name">{collectionName}</h3>
          <MusicCard list={musics} songList={songList} />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.any),
};

Album.defaultProps = {
  id: '', match: '',
};

export default Album;
