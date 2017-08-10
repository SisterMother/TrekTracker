import React from 'react';
import './styles.css';
import $ from 'jquery';
import axios from 'axios';
import reactDOM from 'react-dom';
import Posts from './components/Posts.jsx';
import Login from './components/Login.jsx';
import UserPosts from './components/UserPosts.jsx';
import Upload from './components/Upload.jsx';
import Map from './components/Gmaps.jsx';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { updateImage, handleSearchBoxMounted, handlePlacesChanged, submitImage, onMarkerClick, onMapClick } from './helpers/helpers.js';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import Nav from './components/Nav.jsx';
import Home from './page-components/Home.jsx';
import Login from './page-components/Login.jsx';
import User from './page-components/User.jsx';
import Trail from './page-components/Trail.jsx';

axios.defaults.headers.common['Authorization'] = 'Client-ID 3ec73e8df33fffc';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// [{position:{lat: Number, long: Number}}]
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
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  handleSearchBoxMounted(searchBox) {
  this._searchBox = searchBox;
}

  handlePlacesChanged() {
   const places = this._searchBox.getPlaces();
   const markers = places.map(place => ({
     position: place.geometry.location,
   }));
   // Set markers; set map center to first search result
  const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
  this.setState({
    mapCenter: mapCenter
  });
 }

  submitImage(e) {
    e.preventDefault();
    var form = new FormData();
    form.append('image', this.state.photo[0])
    axios.post('https://api.imgur.com/3/image', form)
    .then((res) => {
      var metaPhoto = {
        title: this.state.photo[0].name,
        text: document.getElementsByTagName('textarea')[0].value,
        image_url: res.data.data.link,
        flag_comments: [],
        trail_name: 'rainbow trails'
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
<<<<<<< HEAD
       axios.post('/markers', {location: context.state.mapCenter})
       .then(res=> {
        //I'm adding this get into the componentDidMount. The data that we receive
        //needs to be in the following format: {position:{lat: LATITUDE, lng: LONGITUDE}}
        //Any other data from the posts can be added when markers are clicked on.
        //I added in the location because we should be able to only get back markers within a certain area range.
        //I will make a dummy call on the server as well.
        context.setState({markers: res.markers})
      })
      .catch(err => {
        console.log('Error getting markers')
      })
=======
    axios.get('/markers', {location:context.state.mapCenter})
    .then(res => {
      context.setState({markers:res.markers})
      /*
      Within this post we can send markers on componentDidMount. I will put a dummy call in the server as well
      Marker locations can be added using the following format. They should be returned in an array with objects enlosed
      with the following format: [{position:{lat:LATITUDE, lng:LONGITUDE}}].
      */

    })
    .catch(err => {
      console.log('not getting markers', err)
    })
>>>>>>> About to start testing dummy helpers.
    axios.get('/places')
      .then(res => {
        console.log('on sucessful get request', data);
        context.setState({trails: res.results})
        console.log(this.state.trails);
      })
      .catch(err => {
        console.log('Error on get request', err);
      });
    axios.get('/api/currentUser')
      .then(res => {
        var email = res.data.email;
        axios.get(`/api/posts/users/${email}`)
          .then(res => {
            this.setState({posts: res.data});
          })
          .catch(err => console.log('error in get api/users/:id: ', err));
      })
      .catch(err => console.log('error in get api/currentUser endpoint: ', err));
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <Nav />
=======
        <h2>TrekTracker</h2>
        <UserPosts posts={this.state.posts}/>
>>>>>>> About to start testing dummy helpers.
        <Switch>
          <Route exact path='/'>
            <Home logged={this.state.logged}/>
          </Route>
          <Route exact path='/login'>
            <Login exact logged={this.state.logged}/>
          </Route>
          <Route path='/users'>
            <User logged={this.state.logged}/>
          </Route>
          <Route path='/trails'>
            <Trail logged={this.state.logged}/>
          </Route>
          <Route path='/upload'>
            <Upload submit={this.submitImage} update={this.updateImageDisplay}/>
          </Route>
        </Switch>
<<<<<<< HEAD
=======
        {<Upload update={this.updateImageDisplay} submit={this.submitImage}/>
          <div style={{
            width: '700px',
            height: '600px'
          }}>
          {console.log('posts: ', this.state.posts)}
       <Map containerElement={< div style = {{width:100+'%', height:100+'%'}}/>} mapElement={< div style = {{width:100+'%', height:100+'%'}}/>}  onPlacesChanged={this.handlePlacesChanged} trails={this.state.trails} mapCenter={this.state.mapCenter} onSearchBoxMounted={this.handleSearchBoxMounted} markers = {this.state.markers} onMapClick={this.onMapClick}  onMarkerClick={this.onMarkerClick}/>
       </div>
>>>>>>> About to start testing dummy helpers.
      </div>
    )
  }
};

reactDOM.render(<BrowserRouter>
                  <App />
                </BrowserRouter>, document.getElementById('app'));
