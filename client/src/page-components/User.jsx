import React from 'react';
import axios from 'axios';

class User extends React.Component {
  constructor(props) {
    super(props);
    // Gets trail name based on the URL the user is on
    let locationSplit = window.location.href.split('/');
    this.user = locationSplit[locationSplit.length - 1];
  }

  render() {
    return (
      <div>
        {'Path: ' + this.user}
      </div>
    );
  }
}

export default User;