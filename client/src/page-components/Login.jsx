import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GoogleButton from 'react-google-button';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  loginRedirect() {
    window.location.href = '/auth/google'
  }

  render() {
    return (
      <div>
        {
          <GoogleButton className='loginBtn' onClick={this.loginRedirect} />
        }
      </div>
    );
  }
}

export default Home;
