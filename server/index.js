var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
// var db = require('../database');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SessionStore = require('sessionstore');
var authRouter = require('./auth-router.js');
var apiRouter = require('./api-router.js');
var eventRouter = require('./event-router.js');

let sessionStore = SessionStore.createSessionStore();

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
app.use(session({
  store: sessionStore,
  secret: 'thisisasecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Setup routes
app.use('/api', apiRouter);
app.use('/', authRouter);
app.use('/event', eventRouter);

// Serve static files
app.get('*/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/bundle.js'));
});


//Get existing markers. //Commented out by Kamie. Doesn't seem relevant.
// app.post('/markers', (req, res) => {
//   var location = req.body.location;
//   //We need to search within a certain area of this location.
//   //Just returns blank right now, put a db call here in order to load saved markers. See index.jsx for more.
//   res.send()
// })


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});


// Start server
app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port', process.env.PORT || 3000, '...');
});
