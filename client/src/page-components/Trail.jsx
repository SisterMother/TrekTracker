import React from 'react';
import axios from 'axios';
import Posts from '../components/Posts.jsx';
import Upload from '../components/Upload.jsx';

class Trail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailId: window.location.href.split('id=')[1],
      posts: []
    };
    
    axios.get('/api/posts/trails/' + this.state.trailId, {params:{trailId:this.state.trailId}})
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