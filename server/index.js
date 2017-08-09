var express = require('express');
var axios = require('axios');
var app = express();
var bodyParser = require('body-parser');
var db = require('../database');
var apiRouter = require('./api-router.js');
var path = require('path');

// Setup API routes
app.use('/api', apiRouter);
app.use(bodyParser.json());

// Serve static files
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/bundle.js'));
});
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

// createPost = (posterData, trailData, title, text, imageUrl)
app.post('/api/photo', (req, res) => {
  var body = req.body;
  res.send();
});

// Start server
app.listen(3000, function() {
  console.log('listening on port 3000...');
});
