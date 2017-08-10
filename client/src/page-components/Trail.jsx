import React from 'react';
import axios from 'axios';
import { withRouter} from 'react-router-dom';

class Trail extends React.Component {
  constructor(props) {
    super(props);
    // Gets user email based on the URL the user is on
    let locationSplit = window.location.href.split('/');
    this.trail = locationSplit[locationSplit.length - 1];
  }

  render() {
    return (
      <div>
        {'Path: ' + this.trail}
      </div>
    );
  }
}

export default Trail;