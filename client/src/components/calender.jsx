import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import EventForm from './eventForm.jsx'
var moment = require('moment');

BigCalendar.momentLocalizer(moment);
moment().format();

moment("2010-10-20 4:30", "YYYY-MM-DD HH:mm"); 

class Calendar extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  formStatus: false
  	}
  	this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen () {
    this.setState({formStatus: true});
  }

  handleClose () {
    this.setState({formStatus: false});
  }

  render(){
    var newEvent = this.state.formStatus === false ? null : <EventForm/>
    return (
      <div {...this.props}>
        <h3 className="callout">
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        <EventForm/>
        {newEvent}
        <BigCalendar
          selectable
          events= {events}
          defaultView='month'
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2017, 8, 26)}
          //onSelectEvent={}// pull up info for event, sign up button included
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
    'title': 'Conference',
    'start': new Date(2015, 3, 11),
    'end': new Date(2015, 3, 13),
    desc: 'Big conference for important people'
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