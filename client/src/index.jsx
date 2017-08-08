import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import reactDOM from 'react-dom';
import Login from './components/Login.jsx';
import Upload from './components/Upload.jsx';
import updateImage from './helpers/helpers.js';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      logged: false,
      image: null,
      photo: null
    }
    this.submitImage = this.submitImage.bind(this);
    this.updateImageDisplay = updateImage.updateImage.bind(this);
  }
  
  // var form = new FormData();
  //   form.append("image", this.state.photo[0]);
  //   //post to the database: 
  //   $.ajax({
  //     "async": true,
  //     "crossDomain": true,
  //     "url": "https://api.imgur.com/3/image",
  //     "method": "POST",
  //     "headers": {
  //       "authorization": "Client-ID 3ec73e8df33fffc"
  //     },
  //     "processData": false,
  //     "contentType": false,
  //     "data": form
  //   }).done((response) => {
  //     //then add the link and other metadata to mysql database
  //     var name = this.state.photo[0].name;
  //     axios.post('/images', {image: response['data'], state: this.state, name: name})
  //       .then((res) => {
  //         console.log('success!: ', res);
  //       })
  //   });

  submitImage(e) {
    e.preventDefault();
    var form = new FormData();
    form.append('image', this.state.image)
    console.log('event: ', e);
    // axios.post('https://api.imgur.com/3/image', {
    //   headers: {
    //     authorization: 'Client-ID 19f99ae10e881f3'
    //   },
    //   crossDomain: true,
    //   processData: false,
    //   contentType: false,
    //   data: form
    // })
    // .then((res) => {
    //   var name = this.state.photo.name;
    //   axios.post('/images', {image: res.data, state: this.state, name: name})
    //     .then((res) => {
    //       console.log('success!: ', res);
    //   })
    // })
  }

  componentDidMount() {
    this.input = document.querySelector('.input');
    this.preview = document.querySelector('.preview');
  }

  render() {
    return (
      <div>
        <h2>Lets Trek!</h2>
        <Switch>
          <Route path='/' component={Login}/>
        </Switch>
        <Upload update={this.updateImageDisplay} submit={this.submitImage}/>
      </div>
    )
  }
};

reactDOM.render(<BrowserRouter>
                  <App />
                </BrowserRouter>, document.getElementById('app'));