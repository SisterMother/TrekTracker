import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import EventForm from './eventForm.jsx'
import NewEventForm from './eventFormNoButton.jsx'
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

var moment = require('moment');

BigCalendar.momentLocalizer(moment);
moment().format();

moment("2010-10-20 4:30", "YYYY-MM-DD HH:mm"); 

class Calendar extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  formStatus: false,
      trails: this.props.trails,
      events: []
  	}
  	this.handleOpen = this.handleOpen.bind(this);
    this.RSVP = this.RSVP.bind(this);
  }

  RSVP(event){
    axios.post('/event/interested', {
      event: event
    })
    .then(function(response){
      console.log('RSVPd') 
    })
    .catch(function(error){
      console.log('we dont want you to come')
    })
  }

  ComponentDidMount(){
    this.setState({trails: this.props.trails})
  }

  handleOpen () {
    this.setState({formStatus: !this.state.formStatus});
  }

  handleClose () {
    this.setState({formStatus: false});
  }

  getEvents (trails) {
    axios.get('/event', {
      params: {
        trails: trails
      }
    })
    .then(function(response){
      this.setState({events: response.events})
    })
  }

  render(){
    var startTime = new Date()
    startTime = startTime.setHours(4);
    var newEvent = this.state.formStatus === false ? null : <NewEventForm events={this.state.events} trails={this.props.trails}/>
    return (
      <div>
        <h3 className="callout">
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        <RaisedButton label="Plan a hike!" onClick={this.handleOpen} />
        {newEvent}
        <BigCalendar
          selectable
          events= {events}
          defaultView='week'
          min={new Date('2017, 1, 7, 05:00')}
          max={new Date('2017, 1, 7, 22:00')}
          scrollToTime={new Date(2010, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={this.RSVP}// pull up info for event, sign up button included
          onSelectSlot={this.handleOpen}// open form to create new event
        />
      </div>
    )
  }
}

var events =[
  {
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2017, 8, 24),
    'end': new Date(2017, 8, 23)
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2017, 8, 20, 0, 0, 0),
    'end': new Date(2017, 8, 25, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2016, 10, 6, 0, 0, 0),
    'end': new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    'title': 'Some Event',
    'start': new Date(2015, 3, 9, 0, 0, 0),
    'end': new Date(2015, 3, 9, 0, 0, 0)
  },
  {
      title: 'test',
      date: new Date(),
      start: new Date(),
      end: new Date(),
      description: 'testing',
      trailId: 339,
      date_time: 'string that wont work'
  },
  {
    'title': 'Meeting',
    'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start':new Date(2015, 3, 12, 12, 0, 0, 0),
    'end': new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start':new Date(2015, 3, 12,14, 0, 0, 0),
    'end': new Date(2015, 3, 12,15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start':new Date(2015, 3, 12, 17, 0, 0, 0),
    'end': new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'start':new Date(2015, 3, 12, 20, 0, 0, 0),
    'end': new Date(2015, 3, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'start':new Date(2015, 3, 13, 7, 0, 0),
    'end': new Date(2015, 3, 13, 10, 30, 0)
  }
]


export default Calendar;