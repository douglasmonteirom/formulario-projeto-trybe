import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      musics: [],
      loading: true,
      albumName: '',
      artistName: '',
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchGetMusics();
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
          const newFavorites = favorites.filter((song) => song.trackId !== music.trackId);
          this.setState({ loading: false, favorites: newFavorites });
        }
      });
  };

  async fetchGetMusics() {
    const { id } = this.state;
    this.setState({ loading: false },
      async () => {
        const list = await getMusics(id);
        this.setState({
          musics: [...list],
          albumName: list[0].collectionName,
          artistName: list[0].artistName,
        });
      });
  }

  render() {
    const { loading, musics, artistName, albumName, favorites } = this.state;

    const renderAlbun = () => (
      <div>
        {musics.map((music, index) => {
          let listMusics = null;
          if (index !== 0) {
            listMusics = (
              <MusicCard
                key={ music.trackId }
                musicElemnt={ music }
                favsSongs={ favorites.some(
                  (song) => song.trackId === music.trackId,
                ) }
                handler={ this.addSongFav }
              />
            );
          }
          return listMusics;
        })}
      </div>
    );

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ albumName }</h2>
        {loading && <Loading /> }
        {renderAlbun()}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
