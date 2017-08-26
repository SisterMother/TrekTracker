import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {isLoggedIn} from '../helpers/helpers.js';

class Navbar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      isLoggedIn : null
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.isLoggedIn = isLoggedIn.bind(this);
    if (this.props.setToggle) {
      this.props.setToggle(this.handleToggle);
    }
    if (this.props.setClose) {
      this.props.setClose(this.handleClose);
    }
  }

  handleToggle () {
    if (!this.state.open) {
      //get login status
      this.isLoggedIn()
        .then((res) => {
          this.setState({
            isLoggedIn: res,
            open: !this.state.open
          });
        })
        .catch((err) => {
          console.log('error determining login status, ', err);
          this.setState({
            isLoggedIn: null,
            open: !this.state.open
          });
        });
    } else {
      this.setState({open: !this.state.open});
    }
  }
  handleClose () {
    this.setState({open: false});
  }

  redirectTo (url) {
    if (!this.isCurrentUrl(url)) {
      window.location.replace(url);
    }
  }

  isCurrentUrl (url) {
    return (window.location.pathname === url);
  }

  render () {
    var logButton = (<div></div>);
    if (this.state.isLoggedIn === true) {
      var logButton = (<MenuItem onClick={this.redirectTo.bind(this, '/logout')}>Logout</MenuItem>);
    } else if (this.state.isLoggedIn === false) {
      var logButton = (<MenuItem onClick={this.redirectTo.bind(this, '/login')}>Login</MenuItem>);
    }
    return (
      <div>
        <AppBar
          title="TrekTracker"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer docked={false} width={250} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <MenuItem onClick={this.redirectTo.bind(this, '/')}>Home</MenuItem>
          <MenuItem onClick={this.redirectTo.bind(this, '/profile')}>My Profile</MenuItem>
          {logButton}
        </Drawer>
      </div>
    )
  }
}

export default Navbar;