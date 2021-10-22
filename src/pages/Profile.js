import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import ProfileEdit from './ProfileEdit';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <p>Profile</p>
      </div>
    );
  }
}

export default Profile;
