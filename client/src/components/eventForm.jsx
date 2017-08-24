import React, {Component} from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

class EventForm extends Component {
  constructor(props){
 	super(props);
 	this.state = {
 	  open: this.props.formStatus,
 	  date : '',
 	  title : '',
 	  description : '',
 	  location : ''
 	}


  this.handleDescription = this.handleDescription.bind(this);
  this.handleTitle = this.handleTitle.bind(this);
  this.handleOpen = this.handleOpen.bind(this);
  this.handleSelect = this.handleSelect.bind(this);
  this.handleClose = this.handleClose.bind(this);

 };

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
  }

  render() {
	const actions = [
	  <FlatButton
	    label="Ok"
	    primary={true}
	    keyboardFocused={true}
	    onClick={this.handleClose}
	  />,
	];

      return (
        <div>
          <RaisedButton label="Plan a hike!" onClick={this.handleOpen} />
            <Dialog
	          title="Dialog With Date Picker"
	          actions={actions}
	          modal={false}
	          open={this.props.formStatus}
	          onRequestClose={this.handleClose}
            >
           Plan your hike here.
          <TextField onChange={this.handleTitle} hintText="Name your event"/><br />

          <DatePicker hintText="Select a date"/>
          <TextField onChange={this.handleDescription} hintText="Tell us more about it!"/><br />
        </Dialog>
      </div>
    );
  }
}

export default EventForm

// module.exports = {
//   handleOpen: EventForm.handleOpen,
//   EventForm: EventForm
// }