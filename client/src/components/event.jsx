import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';


class Event extends React.Component {
  constructor(props){
  	super(props);
    state = {
      open: false,
    };
    this.toggleState= this.toggleState.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  toggleState () {
    this.setState({open: !this.state.open});
  };

  signUp () {
    axios.post('/rsvp', {
      this.props.event
    })
    .then(function(response){
      console.log('RSVPd')
    })
    .catch(function(error){
      console.log('RSVP err', error)
    })
  };

  render() {
    return (
	  <div className="event">
	    <div className="eventname">
	      <h3>{props.event.name}</h3>
	      <h5>{props.event.description}</h5>
	      <h5>Hosted by: {props.event.host}</h5>
	    </div>
	    <div className="rsvp">
	      <FlatButton  label="RSVP" onClick={this.signUp}/>
	    </div>
	  </div>
    );
  }

}

export default Event