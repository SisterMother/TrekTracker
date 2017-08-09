var express = require('express');
var axios = require('axios');
var app = express();
var bodyParser = require('body-parser');
var db = require('../database');
var apiRouter = require('./api-router.js');
var path = require('path');

// Setup API routes
app.use('/api', apiRouter);

// Serve static files
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/bundle.js'));
});
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

// Start server
app.listen(3000, function() {
  console.log('listening on port 3000...');
});
