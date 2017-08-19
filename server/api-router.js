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
  db.createPost(req.user.email, post.trail_id, post.title, post.text, post.image_url).then((post) => {
    res.end(JSON.stringify(post));
  });
});

router.get('/posts/users/:useremail', (req, res) => {
  var userEmail = req.params.useremail;
  db.getPostsByUserEmail(userEmail).then((posts) => {
    res.end(JSON.stringify(posts));
  });
});

router.get('/posts/trails/:trail', (req, res) => {
  var trailName = req.params.trail;
  console.log('[app-router /posts/trails]trail name: ', trailName);
  db.getPostsByTrailName(trailName).then((posts) => {
    res.end(JSON.stringify(posts));
  });
});

 // city: 'Sacramento',
 //  state: 'California',
 //  country: 'United States',
 //  name: 'American River Bike Trail',
 //  parent_id: null,
 //  unique_id: 281,
 //  directions: 'Starting at the confluence of the American and Sacramento Rivers, this trail heads east to Folsom Lake.  The total distance (one-way) is 32 miles.  You can ride any distance since it is an out and back ride. There is currently no &quot;legal\'&quot;singletrack along this route, however that is under review within the Parks &amp; Rec departments that oversee the Trail.  However, you may be able to divert from the paved path up to the levees along the American River to get some dirt under your tires.  The path on top of the levee is legal to ride on. ',
 //  lat: 38.60094,
 //  lon: -121.50776,
 //  description: null,
 //  date_created: null,
 //  children: [],
 //  activities:
// module.exports.createTrail = (id, name, directions = '', latitude = 0, longitude = 0) => {

router.get('/trails', (req, res) => {
  // console.log('whats being sent in the req: ', req.query);
  let lat = `${req.query.lat.split('.')[0]}` || `${34}`;
  let long = `${req.query.lng.split('.')[0]}` || `${-104}`;
  let radius = `${req.query.radius}` || `${100}`;
  let limit = `${req.query.radius}` || `${25}`;
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
