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
      <div data-testid="page-login" className='login-father'>
        <h1>Welcome to my Music App</h1>
        <label htmlFor="Login">
          Your Name:
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
          Enter
        </button>
        {Loaded && <Loading />}
        <a href="https://www.linkedin.com/in/jo%C3%A3o-gallo-19a51622a/">My Linkedin</a>
        <br />
        <a href="https://github.com/joao-gallo"> My Github</a>
        <h4>João Gallo</h4>
      </div>
    );
  }
}

Login.propTypes = { history: PropType.objectOf(PropType.any).isRequired };

export default Login;
