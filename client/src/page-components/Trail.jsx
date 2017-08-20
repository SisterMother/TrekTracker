import React from 'react';
import axios from 'axios';
import Posts from '../components/Posts.jsx';
import Upload from '../components/Upload.jsx';

class Trail extends React.Component {
  constructor(props) {
    super(props);

    let trailId = window.location.search.split('?id=')[1].split('?')[0]; // Successfully grabs trail query parameter regardless of what parameters are declared before or after it
    this.state = {
      trailId,
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
        <Upload />
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default Trail;