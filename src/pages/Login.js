import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const MIN_CHARACTERS_NAME = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      buttonDisable: true,
      loading: false,
      loginIn: false,
    };
  }

  handleState = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      if (target.value.length >= MIN_CHARACTERS_NAME) {
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
    const { nameInput } = this.state;
    this.setState({ loading: true },
      async () => {
        await createUser({ name: nameInput });

        this.setState({ loading: false, loginIn: true });
      });
  }

  render() {
    const { buttonDisable, loading, loginIn } = this.state;
    return (
      <div data-testid="page-login">
        {loginIn && <Redirect to="/search" />}
        {loading && <Loading />}
        <p>Login</p>
        <section>
          Nome:
          <input
            data-testid="login-name-input"
            name="nameInput"
            type="text"
            onChange={ (event) => this.handleState(event) }
          />
        </section>
        <button
          data-testid="login-submit-button"
          type="button"
          onClick={ () => this.fetchOnclick() }
          disabled={ buttonDisable }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
