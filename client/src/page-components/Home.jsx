import { Link, Route, Switch } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
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
        This is the homepage
      </div>
    );
  }
}

export default Home;