import React, {Component} from 'react'
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

var moment = require('moment');

class EventForm extends Component {
  constructor(props){
 	super(props);
 	this.state = {
 	  open: false,
 	  date : null,
    start: null,
    end: null,
 	  title : '',
 	  description : '',
 	  location : '',
    trailId : 0,
    date_time: null
 	}

  this.handleDescription = this.handleDescription.bind(this);
  this.handleTitle = this.handleTitle.bind(this);
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.handleLocation = this.handleLocation.bind(this);
  this.saveEvent = this.saveEvent.bind(this);
  this.handleDate = this.handleDate.bind(this);
  this.handleTime = this.handleTime.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
 };

  saveEvent () {
    axios.post('/event', {
      event: { 
        title: this.state.title,
        date: this.state.date,
        trailId: this.state.location.trailId,
        description: this.state.description,
        location: this.state.location ,
        start: this.state.start,
        end: this.state.end
      }
    })
    .then(function(response){
      console.log('Saved')
    })
    .catch(function(error){
      console.log('Error', error)
    })
    this.handleSubmit();
  }

  handleDescription  (e) {
    this.setState({description: e.target.value });
  }

  handleTitle (e) {
    this.setState({title: e.target.value });
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose () {
    this.setState({open: false});
    console.log(this.state)
  }

  handleLocation (event, index, value) {
    this.setState({
      location: value.name, 
      trailId: value.trailId,
    })
  }

  handleTime(event, time){
    this.setState({start: time})
  }

    handleTime(event, time){
    this.setState({end: time})
  }
  
  handleDate(event, date){
    this.setState({date: date})
  }

  handleSubmit(event){
    let momentTime = moment(this.state.time);
    console.log(momentTime.hours());
    let momentDate = moment(this.state.date);
    let renderedDateTime = moment({
      year: momentDate.year(),
      month: momentDate.month(),
      day: momentDate.date(),
      hour: momentTime.hours(),
      minute: momentTime.minutes()
    });
    console.log('rendered', renderedDateTime);
    this.setState({date_time: renderedDateTime});
    this.handleClose();

  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
       // primary={true}
        //keyboardFocused={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Create Event"
        //primary={true}
        //keyboardFocused={true}
        onClick={this.saveEvent}
      />
    ];

    const items = [];
    for (let i = 0; i < this.props.trails.length; i++ ) {
      items.push(<MenuItem value={this.props.trails[i]} key={i} primaryText={this.props.trails[i].name} />);
    }


      return (
        <div>
          <RaisedButton label="Plan a hike!" onClick={this.handleOpen} />
            <Dialog
	          title="Let us know the details"
	          actions={actions}
	          modal={false}
	          open={this.state.open}
	          onRequestClose={this.handleSubmit}
            >
           Plan your hike here.
          <TextField onChange={this.handleTitle} hintText="Name your event"/><br />
          <DropDownMenu maxHeight={300} onChange={this.handleLocation}>
            {items}
          </DropDownMenu>
          <DatePicker onChange={this.handleDate} value ={this.state.date} hintText="Pick a day" />
          <TimePicker onChange={this.handleTime} value={this.state.time} hintText="Select a start time" />
          <TimePicker onChange={this.handleEnd} value={this.state.time} hintText="Select an end time" />
          <TextField onChange={this.handleDescription} hintText="Tell us more about it!"/><br />
        </Dialog>
      </div>
    );
  }
}

export default EventForm

