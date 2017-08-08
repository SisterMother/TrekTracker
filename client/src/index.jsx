import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import reactDOM from 'react-dom';
import Login from './components/Login.jsx';
import Upload from './components/Upload.jsx';
import updateImage from './helpers/helpers.js';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';
import Map from './components/Gmaps.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      logged: false,
      image: null,
      photo: null,
      mapCenter: {
        lat: 37.7836966,
        lng: -122.4089664
      },
      trails: []
    }
    this.submitImage = this.submitImage.bind(this);
    this.updateImageDisplay = updateImage.updateImage.bind(this);
  }

  submitImage(e) {
    e.preventDefault();
    var form = new FormData();
    form.append('image', this.state.image)
    console.log('event: ', e);
  }

  componentDidMount() {
    this.input = document.querySelector('.input');
    this.preview = document.querySelector('.preview');
  }

  componentDidMount() {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/places',
      success: (data) => {
        console.log('on sucessful get request', data);
        context.setState({trails: data.results})
        console.log(this.state.trails);
      },
      error: (err) => {
        console.log('Error on get request', err);
      }
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
       <Map containerElement={< div style = {{width:100+'%', height:100+'%'}}/>} mapElement={< div style = {{width:100+'%', height:100+'%'}}/>} trails={this.state.trails} mapCenter={this.state.mapCenter} onMarkerClick={this.onMarkerClick.bind(this)}/>
       </div>
      </div>
    )
  }
};

reactDOM.render(<BrowserRouter>
                  <App />
                </BrowserRouter>, document.getElementById('app'));
