import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  render() {
    const { musicElemnt } = this.props;
    const { checked } = this.state;

    const addSongFav = async (e, music) => {
      console.log(e.target.checked);
      this.setState({ checked: true },
        async () => {
          if (e.target.checked) {
            await addSong(music);
            this.setState({ checked: false });
          } else {
            await removeSong(music);
            this.setState({ checked: false });
          }
        });
    };

    return (
      <div>
        {checked && <Loading /> }
        <p>{musicElemnt.trackName}</p>
        <audio data-testid="audio-component" src={ musicElemnt.previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label htmlFor="true">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${musicElemnt.trackId}` }
            onChange={ (event) => addSongFav(event, musicElemnt) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicElemnt: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
