import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  async getFavorites() {
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      favorites: favoritesSongs,
    });
  }

  addSongFav = async (e, music) => {
    const { favorites } = this.state;
    this.setState({ loading: true },
      async () => {
        if (!e.target.checked) {
          await addSong(music);
          this.setState({ loading: false, favorites: [...favorites, music] });
        } else {
          await removeSong(music);
          await this.getFavorites();
          // const newFavorites = favorites.filter((song) => song.trackId !== music.trackId);
          this.setState({ loading: false });
        }
      });
  };

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <Loading />}
        {favorites.map((music) => (
          <MusicCard
            key={ music.trackId }
            musicElemnt={ music }
            favsSongs={ favorites.some(
              (song) => song.trackId === music.trackId,
            ) }
            handler={ this.addSongFav }
          />
        ))}
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

export default Favorites;
