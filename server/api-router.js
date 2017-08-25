var router = require('express').Router();
var db = require('../database');
var googleMaps = require('./foreign-apis/google-maps');
var { getTrailsByLoc } = require('./foreign-apis/trails.js');
var { getWeatherByLoc } = require('./foreign-apis/weather.js');

router.get('/currentUser', (req, res) => {
  res.send(req.user || null);
});

router.post('/posts', (req, res) => {
  var post = req.body.photo;
  db.createPost(req.user.email, post.trail_id, post.title, post.text, post.image_url, post.latitude, post.longitude)
  .then((post) => {
    res.end(JSON.stringify(post));
  })
  .catch((error) => {
    res.status(500).json(error);
  });
});

router.get('/posts/users/:useremail', (req, res) => {
  var userEmail = req.params.useremail;
  db.getPostsByUserEmail(userEmail).then((posts) => {
    res.end(JSON.stringify(posts));
  });
});

router.get('/posts/trails/:trailId', (req, res) => {
  let trailId = req.params.trailId;
  db.getPostsByTrailId(trailId).then((posts) => {
    res.end(JSON.stringify(posts));
  });
});

router.get('/trails', (req, res) => {
  let lat = `${req.query.lat || 34}`;
  let long = `${req.query.lng || -104}`;
  let radius = `${req.query.radius || 100}`;
  let limit = `${req.query.radius || 25}`;
  getTrailsByLoc(lat, long, radius, limit, (err, data) => {
    if(err) {
      res.end(JSON.stringify(err));
    } else {
      data.places.forEach(trail => {
        if (trail.description) {
          trail.description = trail.activities.description;
        } else {
          trail.description += trail.activities.description;
        }
        db.createTrail(trail.unique_id, trail.name, trail.directions, trail.lat, trail.lon, trail.description, trail.activities.length);
      });
      res.end(JSON.stringify(data));
    }
  })
});

router.get('/weather', (req, res) => {
  let lat = `${req.query.lat || 34}`;
  let long = `${req.query.lng || -104}`;
  getWeatherByLoc(lat, long)
    .then((response) => {
      res.end(JSON.stringify(response.data));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.get('/*', (req, res) => {
  res.end('Invalid API request');
});

module.exports = router;
