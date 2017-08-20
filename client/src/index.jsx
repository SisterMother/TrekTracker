import React from 'react';
import './styles.css';
import $ from 'jquery';
import axios from 'axios';
import reactDOM from 'react-dom';
import Posts from './components/Posts.jsx';
import Upload from './components/Upload.jsx';
import Map from './components/Gmaps.jsx';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { updateImage, handlePlacesChanged, trailClick, onDragEnd, onMarkerClose, handleSearchBoxMounted, submitImage, onMarkerClick, handleMapMounted } from './helpers/helpers.js';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import Nav from './components/Nav.jsx';
import TrailList from './components/TrailList.jsx';
import Home from './page-components/Home.jsx';
import Login from './page-components/Login.jsx';
import User from './page-components/User.jsx';
import Trail from './page-components/Trail.jsx';
import gps from './helpers/gps.js';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
      markers:[],
      trailPopup: false

    }
    this.submitImage = submitImage.bind(this);
    this.updateImageDisplay = updateImage.bind(this);
    this.handleSearchBoxMounted = handleSearchBoxMounted.bind(this);
    this.onMarkerClick = onMarkerClick.bind(this);
    this.onMarkerClose = onMarkerClose.bind(this);
    this.onDragEnd = onDragEnd.bind(this);
    this.handleMapMounted = handleMapMounted.bind(this);
    this.onPlacesChanged = handlePlacesChanged.bind(this);
    this.trailClick = trailClick.bind(this);
  }

  componentDidMount() {
    this.input = document.querySelector('.input');
    this.preview = document.querySelector('.preview');

    gps.getLocation()
    .then(value => {
      let newObj = {
        lat : value.coords.latitude,
        lng : value.coords.longitude
      }
      this.setState({mapCenter: newObj})
    })
    .then(() => {
      return axios.get('/api/trails', {
        params: {
          lat: this.state.mapCenter.lat,
          lng: this.state.mapCenter.lng,
          radius: 10
        }
      });
    })
    .then(res => {
      res.data.places.forEach((trail) => {
        const nextMarkers = [
          ...this.state.markers,
          {
            position: {lat: trail.lat, lng: trail.lon},
            name: trail.name,
            city: trail.city,
            state: trail.state,
            showInfo: false,
          },
        ];
        this.setState({
          markers: nextMarkers,
        });
      });
    })
    .catch(err => {
      console.log('oops, error in the trails call: ', err);
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
          <Route exact path='/trail'>
            <Trail logged={this.state.logged}/>
          </Route>
          <Route path='/upload'>
            <Upload submit={this.submitImage} update={this.updateImageDisplay}/>
          </Route>
        </Switch>
        <div className = 'Gmap'  style={{
            width: '700px',
            height: '600px'
          }}>
          <Map
            containerElement={< div style = {{width:100+'%', height:100+'%'}}/>}
            mapElement={< div style = {{width:100+'%', height:100+'%'}}/>}
            mapCenter={this.state.mapCenter}
            onSearchBoxMounted={this.handleSearchBoxMounted}
            markers = {this.state.markers}
            onDragEnd={this.onDragEnd}
            handleMapMounted={this.handleMapMounted}
            onMarkerClose={this.onMarkerClose}
            submit={this.submitImage}
            update={this.updateImageDisplay}
            onMarkerClick={this.onMarkerClick}
            onPlacesChanged={this.onPlacesChanged}
          />
        </div>
        <TrailList onClick={this.trailClick} markers={this.state.markers} />
      </div>
    )
  }
};

reactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <App/>
    </MuiThemeProvider>
  </BrowserRouter>
, document.getElementById('app'));
