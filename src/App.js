import React, { Component } from 'react';
import './static/css/App.scss';

// Components
import Header from './components/Header';
import Notes  from './components/Notes';
// Services
import { checkCurrentUser, signIn, signOut } from './services/UserServices'

class App extends Component {

  state = {
    isLoaded: false,
    user: null,
  }

  componentDidMount = async () => {
    await checkCurrentUser(user => {
      if(user) this.setState({ user });
      this.setState({ isLoaded: true })
    })
  }
  
  handleSignIn = async () => {
    let user = await signIn();
    if(user) this.setState({ user });
  }

  handleSignOut = async () => {
    let status = await signOut();
    if(status) this.setState({ user: null })
  }

  render() {
    const { isLoaded, user, isAccepted } = this.state;
    return (
      <div className="App">
        <Header user={user} isLoaded={isLoaded} signIn={this.handleSignIn} signOut={this.handleSignOut} />
        { user && isLoaded &&
          <Notes user={user} />
        }
      </div>
    );
  }
}

export default App;
