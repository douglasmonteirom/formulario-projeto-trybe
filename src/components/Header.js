import React from 'react';
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
        <p data-testid="header-user-name">
          { name }
        </p>
      </div>
    );
  }
}

export default Header;
