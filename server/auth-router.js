var router = require('express').Router();
var passport = require('passport');

// Middleware to check if a user is authenticated
var isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
};

// Just a test to see if authentication works
// ------------------------------------------
// This page should display basic info about the user once they have signed in through Google
router.get('/authtest', isLoggedIn, (req, res) => {
  res.end(JSON.stringify(req.user));
});


// Needed for Google OAuth
router.get('/auth/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}));
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// Destroys current OAuth session
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
