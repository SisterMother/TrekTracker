var router = require('express').Router();
var db = require('../database');

router.post('/', (req, res) => {
  var event = req.body.event;
  db.createEvent(req.user.email, event.trailId, event.title, event.desc, event.start, event.end, event.contact)
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

router.get('/event/allevents', (req, res)=>{

	//db.getAllEventsNearLocation takes array of trailIds as parameter

});

router.get('/event/user/allevents', (req, res)=>{

  //db.getAllEventsByUserEmail user's email and finds all events that belongs to a user.
});

router.get('/event', (req, res)=>{


  //db.getEventsByTrailId take trail id.


});

// one event with id

// get num of events
