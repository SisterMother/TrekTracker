import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import reactDOM from 'react-dom';
import Login from './components/Login.jsx';
import Upload from './components/Upload.jsx';
import updateImage from './helpers/helpers.js';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';
import Map from './components/Gmaps.jsx'
import SearchBox from 'react-google-maps/lib/places/SearchBox'

axios.defaults.headers.common['Authorization'] = 'Client-ID 3ec73e8df33fffc';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      logged: false,
      image: null,
      photo: null,
      mapCenter: {
        lat: 64.7836966,
        lng: -122.4089664
      },
      trails: [],
      markers:[]

    }
    this.submitImage = this.submitImage.bind(this);
    this.updateImageDisplay = updateImage.updateImage.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  }
  handleSearchBoxMounted(searchBox) {
  this._searchBox = searchBox;
}

  handlePlacesChanged() {
   const places = this._searchBox.getPlaces();
//    Right now, everything below is not goin to be implemented
//   Add a marker for each place returned from search bar
   const markers = places.map(place => ({
     position: place.geometry.location,
   }));
   // Set markers; set map center to first search result
  const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
  this.setState({
    mapCenter: mapCenter,
    markers,
  });
 }


  submitImage(e) {
    e.preventDefault();
    var form = new FormData();
    form.append('image', this.state.photo[0])
    console.log('photo: ', this.state.photo[0]);
    axios.post('https://api.imgur.com/3/image', form)
    .then((res) => {
      console.log('response data: ', res.data);

      var metaPhoto = {
        title: this.state.photo[0].name,
        text: document.getElementsByTagName('textarea')[0].value,
        image_url: res.data.data.link,
        flag_comments: []
      };
      console.log('Success!: ', metaPhoto);
      axios.post('/api/posts', {photo: metaPhoto})
        .then(res => console.log('success: ', res))
        .catch(err => console.log('error in the /api/posts endpoint: ', err));
    })
    .catch((err, res) => {
      if(err) {
        console.log('error: ', err);
      }
    })
  }

  componentDidMount() {
    this.input = document.querySelector('.input');
    this.preview = document.querySelector('.preview');
    var context = this;
    navigator.geolocation.getCurrentPosition(
      (position) => {
          let newObj = {
            lat : position.coords.latitude,
            lng : position.coords.longitude
          }
          console.log('found location')
        var initialPosition = (position);
        context.setState({mapCenter: newObj})
      },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
       );
    axios.get('/places')
      .then(res => {
        console.log('on sucessful get request', data);
        context.setState({trails: data.results})
        console.log(this.state.trails);
      })
      .catch(err => {
        console.log('Error on get request', err);
      });
  }

  onMarkerClick(targetMarker) {
    //Take us to the trail homepage here.
  }


  render() {
    return (
      <div>
        <h2>Lets Trek!</h2>
        <Switch>
          <Route path='/' component={Login}/>
        </Switch>
        <Upload update={this.updateImageDisplay} submit={this.submitImage}/>
          <div style={{
            width: '700px',
            height: '600px'
          }}>
          {console.log('posts: ', this.state.posts)}
       <Map containerElement={< div style = {{width:100+'%', height:100+'%'}}/>} mapElement={< div style = {{width:100+'%', height:100+'%'}}/>}    onPlacesChanged={this.handlePlacesChanged} trails={this.state.trails} mapCenter={this.state.mapCenter} onSearchBoxMounted={this.handleSearchBoxMounted} onMarkerClick={this.onMarkerClick.bind(this)}/>
       </div>
      </div>
    )
  }
};

reactDOM.render(<BrowserRouter>
                  <App />
                </BrowserRouter>, document.getElementById('app'));
