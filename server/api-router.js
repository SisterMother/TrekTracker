var router = require('express').Router();
var db = require('../database');
var googleMaps = require('./foreign-apis/google-maps');
var trails = require('./foreign-apis/trails');

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
  db.createPost(req.user.id, 'id', post.trail_name, post.title, post.text, post.image_url).then((post) => {
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
  console.log(trailName);
  db.getPostsByTrailName(trailName).then((posts) => {
    res.end(JSON.stringify(posts));
  });
});

router.get('/*', (req, res) => {
  res.end('Invalid API request');
});

module.exports = router;
