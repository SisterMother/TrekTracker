import React from 'react';
import GoogleButton from 'react-google-button';

const Home = (props) => {
  return <GoogleButton className='loginBtn' onClick={() => {window.location.href = '/auth/google'}} />;
}

export default Home;
