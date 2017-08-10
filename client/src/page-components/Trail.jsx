import React from 'react';
import axios from 'axios';
import Posts from '../components/Posts.jsx';

class Trail extends React.Component {
  constructor(props) {
    super(props);

    // Gets user email based on the URL the user is on
    let locationSplit = window.location.href.split('/');
    this.state = {
      trail: locationSplit[locationSplit.length - 1],
      posts: []
    };

    axios.get('/api/posts/trails/' + this.state.trail)
    .then((response) => {
      this.setState({posts: response.data});
    });
  }

  render() {
    return (
      <div>
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default Trail;