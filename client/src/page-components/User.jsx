import React from 'react';
import axios from 'axios';
import Posts from '../components/Posts.jsx';

class User extends React.Component {
  constructor(props) {
    super(props);

    // Gets user email based on the URL the user is on
    let locationSplit = window.location.href.split('/');
    this.state = {
      user: locationSplit[locationSplit.length - 1],
      posts: []
    };

    axios.get('/api/posts/users/' + this.state.user)
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

export default User;