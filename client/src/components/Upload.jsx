import React from 'react';
import { updateImage, submitImage } from '../helpers/helpers.js';
import gps from '../helpers/gps.js';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      trailId: window.location.href.split('id=')[1],
      lat: null,
      lng: null,
    }
    this.submitImage = submitImage.bind(this);
    this.updateImage = updateImage.bind(this);
  }

  componentWillMount() {
    gps.getLocation()
    .then(value => {
      //First, we are going to get the location, then set it inside of an object.
      
      //We then set that object as the mapCenter, which dictates where the Google Map locates at.
      this.setState({lat: value.coords.latitude,
                     lng: value.coords.longitude})
    })
    .catch(err => console.log('location access denied: ', err));
  }

  componentDidMount() {
    this.input = document.querySelector('.input');
    this.preview = document.querySelector('.preview');
  }

  render() {
    return(
      <div>
          <form onSubmit={ this.submitImage }>
            <h2>Upload trek pic!</h2>
            <input className='input' onChange={(e) => this.updateImage(e)} type='file' accept='image/*' capture='camera' />
            <button style={{position:'relative',left:'10px',backgroundColor:'papayawhip'}}>Submit</button>
          </form>
          <div className='preview'>
            <p>No files currently selected for upload</p>
          </div>
        </div>);
  }
};


export default Upload;
