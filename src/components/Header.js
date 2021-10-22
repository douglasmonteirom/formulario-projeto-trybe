import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
    };
  }

  componentDidMount() {
    this.getName();
  }

  async getName() {
    this.setState({ loading: true });
    const prom = await getUser();
    this.setState({ name: prom.name, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <div data-testid="header-component">
        {loading && <Loading />}
        <header />
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        <p data-testid="header-user-name">
          { name }
        </p>
      </div>
    );
  }
}

export default Header;
