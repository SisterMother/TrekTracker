import React from 'react';
import axios from 'axios';
import Posts from '../components/Posts.jsx';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { galleryConversion } from '../helpers/helpers.js';
import dummyPosts from '../components/dummyPosts.jsx';

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
//      this.setState({posts: response.data});
      var galleryposts = galleryConversion(dummyPosts);
      this.setState({
        posts: dummyPosts,
        galleryposts: galleryposts
      });
    });
  }

  handleImageLoad(event) {
    console.log('Image loaded ', event.target)
  }

//        <Posts posts={this.state.posts} />
  render() {
    return (
      <div>
        <ImageGallery className='imagegallery'
          items={this.state.galleryposts}
          slideInterval={2000}
          onImageLoad={this.handleImageLoad}
          thumbnailPosition={'top'}
        />
      </div>
    );
  }
}

export default User;