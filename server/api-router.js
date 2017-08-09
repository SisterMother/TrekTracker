var router = require('express').Router();
var db = require('../database');
var googleMaps = require('./foreign-apis/google-maps');

router.get('/places', function (req, res) {
  googleMaps.getPlaces((results) => {
    res.send(results);
  })
});

module.exports = router;