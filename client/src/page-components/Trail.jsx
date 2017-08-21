import React from 'react';
import axios from 'axios';
import Posts from '../components/Posts.jsx';
import Upload from '../components/Upload.jsx';
import TrailGmap from '../components/TrailGmap.jsx';
import {handleMapMounted} from '../helpers/helpers.js';

class Trail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: {}, //Can either be passed a marker, where the info will be embedded, or put the location from the trail api here.
      trailId: props.trail,
      posts: [],
    };
    axios.get('/api/posts/trails/' + this.state.trailId, {params:{trailId:this.state.trailId}})
    .then((response) => {
      this.setState({posts: response.data});
    });
      this.handleMapMounted = handleMapMounted.bind(this);
  }

//Right now, this trail will need to be passed info that can identify it and allow us to zoom in on it's marker.
//I'm building out the map, all that will need to be hooked up is a marker location to zoom on.

  render() {
    return (
      <div>
        <Upload />
        <Posts posts={this.state.posts} />
        <div className = 'Gmap'  style={{
            width: '500px',
            height: '400px'
          }}>
          <Map
            containerElement={< div style = {{width:100+'%', height:100+'%'}}/>}
            mapElement={< div style = {{width:100+'%', height:100+'%'}}/>}
            mapCenter={this.state.mapCenter}
            location = {this.state.location}
            handleMapMounted={this.handleMapMounted}
          />
        </div>
      </div>
    );
  }
}

export default Trail;
