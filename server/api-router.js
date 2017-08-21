var router = require('express').Router();
var db = require('../database');
var googleMaps = require('./foreign-apis/google-maps');
var { getTrailsByLoc } = require('./foreign-apis/trails.js');

router.get('/places', function (req, res) {
  googleMaps.getPlaces((results) => {
    res.send(results);
  })
});

router.get('/currentUser', (req, res) => {
  res.send(req.user || null);
});

// Saves a post to the database and returns it as the response
// The input data should look like this...
//
// {
//   trailName: 'test trail',
//   title: 'example post',
//   text: 'this is an example of a post',
//   image_url: 'https://somewebsite.com/example'
// }
//
// And the HTTP response will contain all of this data plus
// a timestamp that the database will create automatically


router.post('/posts', (req, res) => {
  var post = req.body.photo;
  db.createPost(req.user.email, post.trail_id, post.title, post.text, post.image_url, post.latitude, post.longitude).then((post) => {
    res.end(JSON.stringify(post));
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
        db.createTrail(trail.unique_id, trail.name, trail.directions, trail.lat, trail.lon);
      });
      res.end(JSON.stringify(data));
    }
  })
});

router.get('/*', (req, res) => {
  res.end('Invalid API request');
});

module.exports = router;
