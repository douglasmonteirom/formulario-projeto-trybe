import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const { musicElemnt, favsSongs, handler } = this.props;
    const { loading } = this.state;

    return (
      <div>
        {loading && <Loading /> }
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
            onChange={ (event) => handler(event, musicElemnt) }
            checked={ favsSongs }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  favsSongs: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
  musicElemnt: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
