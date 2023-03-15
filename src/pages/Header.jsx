import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    user: {},
  }

  componentDidMount = async () => {
    const user = await getUser();
    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <h2>cabeçote</h2>
        { !user.name ? <Loading />
          : (
            <p data-testid="header-user-name">
              oi,
              { user.name }
              ,quer ouvir uma coisinha?
            </p>) }
        <Link data-testid="link-to-search" to="/search">
          search
        </Link>
        <Link data-testid="link-to-favorites" to="/favorites">
          favorites
        </Link>
        <Link data-testid="link-to-profile" to="/profile">
          profile
        </Link>
      </header>
    );
  }
}

export default Header;
