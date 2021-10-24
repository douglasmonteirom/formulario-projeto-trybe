import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
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
    };
  }

  async componentDidMount() {
    this.fetchGetMusics();
  }

  async fetchGetMusics() {
    const { id } = this.state;
    const { match } = this.props;
    this.setState({ id: match.params.id, loading: false },
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
    const { loading, musics, artistName, albumName } = this.state;

    const renderAlbun = () => (
      <div>
        {musics.map(({ previewUrl, trackId, trackName }, index) => {
          let listMusics = null;
          if (index !== 0) {
            listMusics = (
              <MusicCard key={ trackId } musicPreviw={ previewUrl } name={ trackName } />
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
        {loading ? <Loading /> : renderAlbun()}
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
