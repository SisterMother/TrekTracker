import React from 'react';
import './styles.css';
import $ from 'jquery';
import axios from 'axios';
import reactDOM from 'react-dom';
import Posts from './components/Posts.jsx';
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
        lat: 64.7836966,
        lng: -122.4089664
      },
      trails: [],
      markers:[]

    }
    this.submitImage = submitImage.bind(this);
    this.updateImageDisplay = updateImage.bind(this);
    this.handlePlacesChanged = handlePlacesChanged.bind(this);
    this.handleSearchBoxMounted = handleSearchBoxMounted.bind(this);
    this.onMarkerClick = onMarkerClick.bind(this);
    this.onMapClick = onMapClick.bind(this);
  }

  componentDidMount() {
    this.input = document.querySelector('.input');
    this.preview = document.querySelector('.preview');
    var context = this;
    gps.getLocation().then(console.log);
    axios.get('/places')
      .then(res => {
        console.log('on sucessful get request', data);
        context.setState({trails: data.results})
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
        <Nav />
        <Upload submit={this.submitImage.bind(this)} update={this.updateImageDisplay}/>
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
      </div>
    )
  }
};

reactDOM.render(<BrowserRouter>
                  <App />
                </BrowserRouter>, document.getElementById('app'));
