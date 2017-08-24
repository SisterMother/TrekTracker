var router = require('express').Router();
var db = require('../database');

router.post('/event', (req, res) => {
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

module.exports = router;
