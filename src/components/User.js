import React, { Component } from 'react';
import '../static/css/App.scss';

// Icons
import { FaSignOutAlt } from 'react-icons/fa'

class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="user">
        <img src={user.photoURL} className="user-pp" alt="user-pp" />
      </div>
    );
  }
}

export default User;
