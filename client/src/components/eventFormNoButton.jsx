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


class NewEventForm extends Component {
  constructor(props){
 	super(props);
 	this.state = {
 	  open: true,
 	  date : null,
      start: null,
      end: null,
 	  title : '',
 	  description : '',
 	  location : '',
      trailId : 0,
      date_time: null,
      value: 0
 	}

  this.handleDescription = this.handleDescription.bind(this);
  this.handleTitle = this.handleTitle.bind(this);
  this.handleOpen = this.handleOpen.bind(this);
  this.handleSelect = this.handleSelect.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.handleLocation = this.handleLocation.bind(this);
  this.saveEvent = this.saveEvent.bind(this);
  this.handleDate = this.handleDate.bind(this);
  this.handleTime = this.handleTime.bind(this);
  this.handleEnd = this.handleEnd.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
 };

  saveEvent () {
  	this.handleSubmit();
  	axios.post('/event', {
      event: { 
      	title: this.state.title,
	    date: this.state.date,
	    start: this.state.start,
	    end: this.state.end,
	    description: this.state.description,
	    trailId: this.state.trailId,
	    date_time: this.state.date_time 
	  }
  	})
  	.then(function(response){
  	  console.log('Saved')
  	})
  	.catch(function(error){
  	  console.log('Error', error)
  	})
  	this.handleClose();
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

  handleSelect (value) {
    this.setState({location: value});
  }

  handleClose () {
    this.setState({open: false});
    console.log(this.state)
  }

  handleLocation (event, index, value) {
  	console.log(index)
    this.setState({
      location: value.name, 
      trailId: value.trailId,
      value: index
    })
    console.log(this.state)
  }

  handleTime(event, time){
    this.setState({start: time})
  }

  handleEnd(event, time){
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

  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Create Event"
        onClick={this.saveEvent}
      />
    ];

    const items = [<MenuItem value={0} key ={0} primaryText ="Select a trail" />];

    for (let i = 1; i < this.props.trails.length-1; i++ ) {
      items.push(<MenuItem value={this.props.trails[i]} key={i} primaryText={this.props.trails[i].name} />);
    }
      return (
        <div>
            <Dialog
	          title="Let us know the details"
	          actions={actions}
	          modal={false}
	          open={this.state.open}
	          onRequestClose={this.handleSubmit}
            >
           Plan your hike here.<br/>
          <TextField onChange={this.handleTitle} hintText="Name your event"/><br />
          <DropDownMenu value={0} maxHeight={300} onChange={this.handleLocation}>
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

export default NewEventForm