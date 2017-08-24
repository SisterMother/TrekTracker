import React from 'react';
import axios from 'axios';
import Map from '../components/Gmaps.jsx';
import { handlePlacesChanged, trailClick, onDragEnd, onMarkerClose, handleSearchBoxMounted, onMarkerClick, handleMapMounted } from '../helpers/helpers.js';
import gps from '../helpers/gps.js';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import Nav from '../components/Nav.jsx';
import TrailList from '../components/TrailList.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import Calendar from '../components/calender.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      mapCenter: {
        lat: 34.7836966,
        lng: -115.4089664
      },
      markers: [],
      trailPopup: false
    }

    this.handleSearchBoxMounted = handleSearchBoxMounted.bind(this);
    this.onMarkerClick = onMarkerClick.bind(this);
    this.onMarkerClose = onMarkerClose.bind(this);
    this.onDragEnd = onDragEnd.bind(this);
    this.handleMapMounted = handleMapMounted.bind(this);
    this.onPlacesChanged = handlePlacesChanged.bind(this);
    this.trailClick = trailClick.bind(this);
    this.changeId = props.changeId;

  }
  componentDidMount() {
    //Not sure what the lines below do.
    //Note, right now the geolocation is just HTML5.
    gps.getLocation()
    .then(value => {
      //First, we are going to get the location, then set it inside of an object.
      let newObj = {
        lat: value.coords.latitude,
        lng: value.coords.longitude
      }
      //We then set that object as the mapCenter, which dictates where the Google Map locates at.
      this.setState({mapCenter: newObj})
    })
    //Once we get the location of the user, we can then find trails in their area. We search using the MapCenter coordinates.
    .then(() => {
      return axios.get('/api/trails', {
        params: {
          lat: this.state.mapCenter.lat,
          lng: this.state.mapCenter.lng,
          radius: 25
        }
      });
    })
    .then(res => {
      //Once we get trails from our particular area, we can then create markers on the map.
      res.data.places.forEach((trail) => {
        /*
        We are going to set an array containing all of the markers.
        The spread operator is used as a type of concat so that markers don't overwrite themselves.
        */
        const nextMarkers = [
          ...this.state.markers,
          {
            /*
            We set an object with some information that we are going to need later one.
            In order to populate the map/list we use information passed in here.
            */
            position: {lat: trail.lat, lng: trail.lon},
            name: trail.name,
            city: trail.city,
            state: trail.state,
            //showInfo toggles the marker infowinow box. It is set to false right now, when the marker is clicked it will toggle to true.
            showInfo: false,
            trailId: trail.unique_id
          },
        ];
        this.setState({
          //The empty markers array in state is set to the populated nextMarkers array.
          markers: nextMarkers,
        });
      });
    })
    .catch(err => {
      console.log('oops, error in the trails call: ', err);
    });
  }

  loginRedirect() {
    window.location.href = '/auth/google'
  }

  render() {
    return (
      <div>
        <div className = 'Gmap col-wide'>
          <Map
            containerElement={ < div style = {{width:100+'%', height:100+'%'}}/> }
            mapElement={< div style = {{width:100+'%', height:100+'%'}}/>}
            mapCenter={this.state.mapCenter}
            onSearchBoxMounted={this.handleSearchBoxMounted}
            markers = {this.state.markers}
            onDragEnd={this.onDragEnd}
            handleMapMounted={this.handleMapMounted}
            onMarkerClose={this.onMarkerClose}
            onMarkerClick={this.onMarkerClick}
            onPlacesChanged={this.onPlacesChanged}
            changeId={this.changeId}
          />
        </div>
        <div className='col-narrow'>
          {this.state.markers.length > 0 ? <TrailList onClick={this.trailClick} markers={this.state.markers} /> : <CircularProgress size={200} thickness={10} style={{'width': '50%', 'position': 'relative', 'left': '25%'}} />}
        </div>
        <div className='calendar'>
          <Calendar/>
        </div>
      </div>
    );
  }
}

export default Home;
