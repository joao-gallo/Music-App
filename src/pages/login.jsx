import React, { Component } from 'react';
import PropType from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    name: '',
    Loaded: false,
  }

  handleLogin = async () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({ Loaded: true });
    await createUser({ name });
    this.setState({ Loaded: false });
    history.push('/search');
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  }

  render() {
    const { name, Loaded } = this.state;
    const charMin = 3;
    return (
      <div data-testid="page-login">
        <label htmlFor="Login">
          Seu nome:
          <input
            name="Login"
            type="text"
            data-testid="login-name-input"
            className='nomeClass'
            onChange={ this.handleChange }
            value={ name }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          onClick={ this.handleLogin }
          disabled={ name.length < charMin }
        >
          Entrar
        </button>
        {Loaded && <Loading />}
      </div>
    );
  }
}

Login.propTypes = { history: PropType.objectOf(PropType.any).isRequired };

export default Login;
