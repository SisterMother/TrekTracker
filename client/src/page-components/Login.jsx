import { Link, Route, Switch } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';

class Home extends React.Component {
  constructor(props) {
    super(props);
    if (props.logged) {
      window.location.href = '/'
    }
  }

  loginRedirect() {
    window.location.href = '/auth/google'
  }

  render() {
    return (
      <div>
        {
          this.props.logged ? <div>You are already logged in</div> : <GoogleButton onClick={this.loginRedirect} />
        }
      </div>
    );
  }
}

export default Home;