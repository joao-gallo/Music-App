import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.songAdd = this.songAdd.bind(this);
    this.state = {
      loadedFav: false,
    };
  }

  async songAdd({ target }) {
    const { list } = this.props;
    this.setState({ loadedFav: true });
    const musicsResult = list.find((track) => track.trackName === target.name);
    await addSong(musicsResult);
    this.setState({ loadedFav: false });
  }

  render() {
    const { list, songList } = this.props;
    const { loadedFav } = this.state;
    return (
      <div className="tracks-list">
        {loadedFav ? <Loading />
          : <p>Exibindo resultados</p>}
        <div>
          {list.map((music, i) => (
            <div key={ i }>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <span>{music.trackName}</span>
              {songList.some((song) => song.trackId === music.trackId)
                ? (
                  <input
                    checked
                    data-testid={ `checkbox-music-${music.trackId}` }
                    onChange={ (event) => this.songAdd(event) }
                    type="checkbox"
                    name={ music.trackName }
                  />)
                : (
                  <input
                    data-testid={ `checkbox-music-${music.trackId}` }
                    onChange={ (event) => this.songAdd(event) }
                    type="checkbox"
                    name={ music.trackName }
                  />)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  list: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  songList: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};
export default MusicCard;
