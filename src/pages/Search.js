import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_CHARACTERS_ARTIST = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchName: '',
      artistaName: '',
      buttonDisable: true,
      albuns: [],
      loading: false,
      request: false,
    };
  }

  handleState = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      if (target.value.length >= MIN_CHARACTERS_ARTIST) {
        this.setState({
          buttonDisable: false,
        });
      } else {
        this.setState({
          buttonDisable: true,
        });
      }
    });
  }

  async fetchOnclick() {
    const { searchName } = this.state;
    this.setState({ loading: true, artistaName: ` ${searchName}` },
      async () => {
        const list = await searchAlbumsAPI(searchName);
        this.setState({
          loading: false,
          albuns: [...list],
          searchName: '',
          request: true,
        });
      });
  }

  render() {
    const {
      buttonDisable,
      searchName,
      loading,
      albuns,
      request,
      artistaName,
    } = this.state;
    const renderFormSearch = () => (
      <section>
        <label htmlFor="true">
          <input
            name="searchName"
            data-testid="search-artist-input"
            type="text"
            value={ searchName }
            placeholder="Nome do Artista"
            onChange={ (event) => this.handleState(event) }

          />
        </label>
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonDisable }
          onClick={ () => this.fetchOnclick() }
        >
          Pesquisar
        </button>
      </section>
    );
    const albunsList = () => (
      <div>
        Resultado de álbuns de:
        {artistaName}
        {albuns.map(({ collectionId, collectionName, artworkUrl100 }) => (
          <div key={ collectionId }>
            <Link
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
            >
              <img src={ artworkUrl100 } alt={ collectionName } />
            </Link>
            <p>{ collectionName }</p>
          </div>
        ))}
      </div>
    );

    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : renderFormSearch()}
        {albuns.length !== 0 && albunsList()}
        {albuns.length === 0 && request && <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;
