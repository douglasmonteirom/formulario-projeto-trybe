import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicPreviw, name } = this.props;
    return (
      <div>
        <p>{name}</p>
        <audio data-testid="audio-component" src={ musicPreviw } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicPreviw: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MusicCard;
