import React, { Component } from 'react';
import '../static/css/App.scss';

class SignIn extends Component {
  render() {
    return (
      <div className="signIn">
        <button className="button-primary" onClick={this.props.signIn} >
          Sign in with Google
        </button>
      </div>
    );
  }
}

export default SignIn;
