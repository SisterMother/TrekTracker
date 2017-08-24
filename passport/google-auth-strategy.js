let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth2').Strategy;
let users = require('../database/models.js').users;
let config;

if (!process.env.NODE_ENV) {
  config = require('./config.json');
}

module.exports = (passport) => {
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || config.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || config.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL || config.CALLBACK_URL,
      passReqToCallback: true
    },
    (request, token, refreshToken, profile, done) => {
      process.nextTick(() => {
        console.log(profile);
        users.findOne(
          {
            where: {
              id: profile.id
            }
          }
        ).then((user) => {
          if (user) {
            return done(null, user);
          } else {
            var newUser = new users();
            newUser.id = profile.id;
            newUser.token = token;
            newUser.firstname = profile.name.givenName;
            newUser.lastname = profile.name.familyName;
            newUser.email = profile.emails[0].value;
            newUser.save((err) => {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        }).catch((err) => {
          return done(err);
        });
      });
    }
  ));
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};