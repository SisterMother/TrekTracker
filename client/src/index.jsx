import React from 'react';
import './styles.css';
import $ from 'jquery';
import axios from 'axios';
import reactDOM from 'react-dom';
import Posts from './components/Posts.jsx';
import Upload from './components/Upload.jsx';
import Map from './components/Gmaps.jsx';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { updateImage, onDragEnd, handleSearchBoxMounted, handlePlacesChanged, submitImage, onMarkerClick, handleMapMounted, onMapClick } from './helpers/helpers.js';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import Nav from './components/Nav.jsx';
import Home from './page-components/Home.jsx';
import Login from './page-components/Login.jsx';
import User from './page-components/User.jsx';
import Trail from './page-components/Trail.jsx';
import gps from './helpers/gps.js';
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
        lat: 34.7836966,
        lng: -115.4089664
      },
      markers:[]

    }
    this.submitImage = submitImage.bind(this);
    this.updateImageDisplay = updateImage.bind(this);
    this.handlePlacesChanged = handlePlacesChanged.bind(this);
    this.handleSearchBoxMounted = handleSearchBoxMounted.bind(this);
    this.onMarkerClick = onMarkerClick.bind(this);
    this.onMapClick = onMapClick.bind(this);
    this.onDragEnd = onDragEnd.bind(this);
    this.handleMapMounted = handleMapMounted.bind(this);
  }

  componentDidMount() {
    this.input = document.querySelector('.input');
    this.preview = document.querySelector('.preview');
    gps.getLocation().then(value => {
          let newObj = {
            lat : value.coords.latitude,
            lng : value.coords.longitude
          }
        this.setState({mapCenter: newObj})
      })
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
    // const getTrailsByLoc = (lat='34', long='-105', limit='25', radius='100')
    axios.get('/api/trails',
      {
        params: {
          lat: this.state.mapCenter.lat,
          lng: this.state.mapCenter.lng,
          radius: 100
        }
      })
      .then(res => {
      res.data.places.forEach((trail) => {
        const nextMarkers = [
          ...this.state.markers,
          {
             position: {lat: trail.lat, lng: trail.lon}
           },
         ];
         this.setState({
           markers: nextMarkers,
         });
       })
     })
      .catch(err => {
        console.log('oops, error in the trails call: ', err);
      });
  }

  render() {
    return (
      <div>
        <Nav />
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
        <div style={{
            width: '700px',
            height: '600px'
          }}>
       <Map containerElement={< div style = {{width:100+'%', height:100+'%'}}/>} mapElement={< div style = {{width:100+'%', height:100+'%'}}/>}  onPlacesChanged={this.handlePlacesChanged} trails={this.state.trails} mapCenter={this.state.mapCenter} onSearchBoxMounted={this.handleSearchBoxMounted} markers = {this.state.markers} onMapClick={this.onMapClick} onDragEnd={this.onDragEnd} handleMapMounted={this.handleMapMounted} onMarkerClick={this.onMarkerClick}/>
       </div>
      </div>
    )
  }
};

reactDOM.render(<BrowserRouter>
                  <App />
                </BrowserRouter>, document.getElementById('app'));
