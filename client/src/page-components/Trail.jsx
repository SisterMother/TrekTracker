import React from 'react';
import axios from 'axios';
import Posts from '../components/Posts.jsx';
import Upload from '../components/Upload.jsx';
import Weather from '../components/Weather.jsx';

class Trail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailId: window.location.href.split('id=')[1],
      posts: [],
      currentUser: null,
      trailInfo: {}
    };
    
    //retrieve trail's posts from server/database
    axios.get('/api/posts/trails/' + this.state.trailId, {params:{trailId:this.state.trailId}})
    .then((response) => {
      this.setState({posts: response.data});
    });

    //retrieve current user from server
    axios.get('/api/currentuser')
    .then((response) => {
      if (response.data) {
        this.setState({currentUser: response.data});
      }
    });

    //dummy data until can retrieve trail info from server/database
    var trails = [
      {
        "id": 1,
        "name": "testtrail",
        "latitude": 37.7749,
        "longitude": -122.4194
      },
      {
        "id": 2,
        "name": "testtrail2",
        "latitude": 37.7749,
        "longitude": -122.4194
      }
    ];
    //retrieve current trail info from server/database
    //axios.get('/trails/' + this.state.trailId)
    Promise.resolve(trails[0])
      .then((response) => {
        if (response) {
          this.setState({trailInfo: response});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      Object.keys(this.state.trailInfo).length === 0 ? (<div></div>) :
        (<div>
          <Weather latitude={this.state.trailInfo.latitude} longitude={this.state.trailInfo.longitude}/>
          {this.state.currentUser ? <Upload/> : <div/>}
          <Posts posts={this.state.posts} />
        </div>)
    );
  }
}

export default Trail;