var router = require('express').Router();
var db = require('../database');
var googleMaps = require('./foreign-apis/google-maps');

router.get('/places', function (req, res) {
  googleMaps.getPlaces((results) => {
    res.send(results);
  })
});

router.post('/api/photo', (req, res) => {
  var post = req.body.photo;
  db.createPost(1, 1, post.title, post.text, post.image_url).then((post) => {
    res.send(post);
  });
});

module.exports = router;