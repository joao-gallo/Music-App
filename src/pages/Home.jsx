import React from 'react';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './login';
import Search from './search';
import Album from './album';
import Favorites from './favorites';
import Profile from './profile';
import ProfileEdit from './profileEdit';
import NotFound from './notFound';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={ Login } />
        <Route path="/search" exact component={ Search } />
        <Route
          path="/album/:id"
          render={ (props) => <Album { ...props } /> }
        />
        <Route path="/favorites" exact component={ Favorites } />
        <Route path="/profile" exact component={ Profile } />
        <Route path="/profile/edit" exact component={ ProfileEdit } />
        <Route path="/*" exact component={ NotFound } />
      </div>
    );
  }
}

export default Home;
