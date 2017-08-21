import React from 'react';
import axios from 'axios';
import reactDOM from 'react-dom';
import Posts from './components/Posts.jsx';
import Map from './components/Gmaps.jsx';
import { changeSelectedId } from './helpers/helpers.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Home from './page-components/Home.jsx';
import Login from './page-components/Login.jsx';
import User from './page-components/User.jsx';
import Trail from './page-components/Trail.jsx';
import { lightBaseTheme, MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import './styles.css';
axios.defaults.headers.common['Authorization'] = 'Client-ID 3ec73e8df33fffc';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      selectedId: null
    }
    /*Bindings are set here.
    For whoever gets this as a legacy, adding redux could fix almost a lot of the spaghetti code qualities.
    */
    this.changeSelectedId = changeSelectedId.bind(this);
  }

//When the app mounts we are going to do the following actions. Load the current user.

  componentDidMount() {
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
            <Home changeId={this.changeSelectedId} />
          </Route>
          <Route exact path='/login'>
            <Login/>
          </Route>
          <Route path='/users'>
          <User/>
          </Route>
          <Route exact path='/profile'>
            <User currentUser={true} />
          </Route>
          <Route exact path='/trail'>
            <Trail trail={this.state.selectedId}/>
          </Route>
        </Switch>
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
