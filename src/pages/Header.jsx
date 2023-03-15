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
      <header data-testid="header-component" className='header'>
        <h2>Music App</h2>
        <div className='link-father'>
          <Link className='link' data-testid="link-to-search" to="/search">
            Search
          </Link>
          <Link className='link' data-testid="link-to-favorites" to="/favorites">
            Favorites
          </Link>
          <Link className='link' data-testid="link-to-profile" to="/profile">
            Profile
          </Link>
        </div>
        {/* Checking if the user is logged in, if succeed, user's name should appear */}
        {!user.name ? <Loading />
          : (
            <p data-testid="header-user-name" className='username-p'>
              {user.name}
              , wanna listen some cool songs?
            </p>)}
      </header>
    );
  }
}

export default Header;
