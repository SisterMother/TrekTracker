import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import reactDOM from 'react-dom';
import Login from './components/Login.jsx';
import Upload from './components/Upload.jsx';
import updateImage from './helpers/helpers.js';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';

axios.defaults.headers.common['Authorization'] = 'Client-ID 3ec73e8df33fffc';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      logged: false,
      photo: null
    }
    this.submitImage = this.submitImage.bind(this);
    this.updateImageDisplay = updateImage.updateImage.bind(this);
  }

  submitImage(e) {
    e.preventDefault();
    var form = new FormData();
    form.append('image', this.state.photo[0])
    console.log('photo: ', this.state.photo[0]);
    axios.post('https://api.imgur.com/3/image', form)
    .then((res) => {
      var metaPhoto = {
        title: this.state.photo[0].name,
        text: document.getElementsByTagName('textarea')[0].value,
        image_url: res.data.link,
        view_count: 0,
        flag_count: 0,
        flag_comments: []
      };
      console.log('Success!: ', metaPhoto);
      //now make an axios post request to our server
      //to them store the metaPhoto in the db
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