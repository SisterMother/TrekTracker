var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2');
var users = require('../database/models.js').users;
var config = require('./config.json');

var GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET;
var callbackURL = 'localhost:3000/auth/google/callback'

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    users.findOrCreate({googleId: profile.id}, (err, user) => {
      return done(err, user);
    });
  }
));