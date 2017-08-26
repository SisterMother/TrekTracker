var router = require('express').Router();
var db = require('../database');

router.post('/', (req, res) => {
  var event = req.body.event;
  console.log('EVENT', event)
  db.createEvent(req.user.id, event.trailId, event.title, event.description, event.location, event.date, event.start, event.end)
  .then((post) => {
    res.end(JSON.stringify(post));
  })
  .catch((error) => {
    res.status(500).json(error);
  })
  res.send();
});

router.post('/interested', (req, res) => {
  // profile photo url === req.user.photos[0].value
  db.registerInterest(req.user.id, req.body.event.event_id)
  .then((post) => {
    res.end(JSON.stringify(post));
  })
  .catch((error) => {
    res.status(500).json(error);
  })
  res.send();
});

module.exports = router;


// all events

router.get('/allevents', (req, res)=>{

	//db.getAllEventsNearLocation takes array of trailIds as parameter

});

router.get('/user/allevents', (req, res)=>{

  //db.getAllEventsByUserId user's email and finds all events that belongs to a user.
});

router.get('/', (req, res)=>{


  //db.getEventsByTrailId take trail id.


});

// one event with id

// get num of events
