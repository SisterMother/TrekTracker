import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

class Navbar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    if (this.props.setToggle) {
      this.props.setToggle(this.handleToggle);
    }
    if (this.props.setClose) {
      this.props.setClose(this.handleClose);
    }
  }

  handleToggle () {
    this.setState({open: !this.state.open});
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
    return (
      <div>
        <AppBar
          title="TrekTracker"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer docked={false} width={250} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <MenuItem onClick={this.redirectTo.bind(this, '/')}>Home</MenuItem>
          <MenuItem onClick={this.redirectTo.bind(this, '/upload')}>Upload</MenuItem>
          <MenuItem onClick={this.redirectTo.bind(this, '/profile')}>Profile</MenuItem>
          <MenuItem onClick={this.redirectTo.bind(this, '/logout')}>Logout</MenuItem>
        </Drawer>
      </div>
    )
  }
}

export default Navbar;
