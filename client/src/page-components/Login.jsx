import React from 'react';
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
      <GoogleButton className='loginBtn' onClick={this.loginRedirect} />
    );
  }
}

export default Home;
