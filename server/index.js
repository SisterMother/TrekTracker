var express = require('express');
var axios = require('axios');
var app = express();

var bodyParser = require('body-parser');
var post = require('../database');
var GmapsAPI = require('../client/src/googleSearch');


app.use(express.static(__dirname + '/../client/dist'));

app.post('/images', (req, res) => {
  axios.post()
});

// app.get('/post', function (req, res) {
//   post.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.get('/places', function (req, res) {
  console.log('getting');
  GmapsAPI.getGooglePlaces((results) => {
    console.log('result from google places', results);
    res.send(results);
  })

});

app.listen(3000, function() {
  console.log('listening on port 3000...');
});
