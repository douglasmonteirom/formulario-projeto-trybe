import React from 'react';
import Header from '../components/Header';

const MIN_CHARACTERS_ARTIST = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisable: true,
    };
  }

  handleState = ({ target }) => {
    if (target.value.length >= MIN_CHARACTERS_ARTIST) {
      this.setState({
        buttonDisable: false,
      });
    } else {
      this.setState({
        buttonDisable: true,
      });
    }
  }

  render() {
    const { buttonDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="true">
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome do Artista"
            onChange={ (event) => this.handleState(event) }

          />
        </label>
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonDisable }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
