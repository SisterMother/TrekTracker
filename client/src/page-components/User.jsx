import React from 'react';
import axios from 'axios';
import Posts from '../components/Posts.jsx';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: null,
      posts: []
    };

    if (props.currentUser) {
      this.getCurrentUser()
      .then(() => {
        this.getPosts();
      });
    } else {
      let locationSplit = window.location.href.split('/');
      let email = locationSplit[locationSplit.length - 1];
      this.state.userEmail = email;
      this.getPosts();
    }

  }

  getCurrentUser () {
    return axios.get('/api/currentuser')
    .then((response) => {
      this.setState({userEmail: response.data.email});
    });
  }

  getPosts () {
    return axios.get('/api/posts/users/' + this.state.userEmail)
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