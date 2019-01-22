import React, { Component } from 'react';
import '../static/css/App.scss';

// Components
import SignIn from './SignIn';
import User   from './User';
// Icons
import { FaSignOutAlt } from 'react-icons/fa'

class Header extends Component {
  render() {
    const { isLoaded, user, signIn, signOut } = this.props;
    return (
      <header className="flex-between">
        <div>
          <h1 className="mb-0">learnbyself</h1>
          <p className="mt-0">you can learn everything by reminding yourself</p>
        </div>
        {isLoaded && user &&
          <div className="header-user">
            <User user={user} />
            <button onClick={signOut}>
              Sign out
              <FaSignOutAlt className="text-normal button-icon-right" />
            </button>
          </div>
        }
        {!user && isLoaded && <SignIn signIn={signIn}/>}
      </header>
    );
  }
}

export default Header;
