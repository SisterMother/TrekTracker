var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var db = require('../database');
var apiRouter = require('./api-router.js');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var authRouter = require('./auth-router.js');
var Session = require('express-session');

var app = express();

// Sets port to env variable for deployment
app.set('port', process.env.PORT || 3000);

// Activates Google OAuth passport strategy
require('../passport/google-auth-strategy.js')(passport);

// ---- MIDDLEWARE ----
// Cookie parse middleware
app.use(cookieParser());
// JSON middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// Passport and session middleware
app.use(Session({
  secret: 'thisisasecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Setup routes
app.use('/api', apiRouter);
app.use('/', authRouter);

// Serve static files
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/bundle.js'));
});
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.get('/markers', (req, res) => {
var location = req.body.location;
//This should be a pair of coords that we can search from. Return back an array of markers.
res.send();
});



// Start server
app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port', process.env.PORT || 3000, '...');
});
