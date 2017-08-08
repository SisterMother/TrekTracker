var models = require('./models.js');
var Sequelize = models.Sequelize;

var db = {};

// Gets all users that strictly match non-unique data (firstname and lastname in the case of users)
// See db.getUser() docs for details and examples
//
// Exceptions:
// 1. userInfoObj references data that is not stored for users (Check the models.js file to see what you can reference)
db.getUsers = (userInfoObj) => {
};

// Accepts an object containing one piece of unique data
// (email and userID are the only unique keys in the case of users)
// and returns a promise that will resolve with the entire data of
// the user except for the user's password hash
//
// If no data is passed in, this will return all users in the database
//---------------------------------------------------------
// EXAMPLE - db.getUser({id: 1}).then(console.log);
// This would grab the user whose ID in the database is 1
// and log the returned object in the console
// The object will be in this format
// {
//   id: 1,
//   firstname: 'test',
//   lastname: 'person',
//   email: 'test@example.com'
// }
// Need another example? Fine.
// EXAMPLE - db.getUser({email: 'hello@world.com'}).then(console.log);
// This would log something such as...
// {
//   id: 256,
//   firstname: 'hello',
//   lastname: 'world',
//   email: 'hello@world.com'
// }
//
// Exceptions:
// 1. userInfoObj references data that is not stored for users (Check the models.js file to see what you can reference, IE: db.getUser({qwerty: 'test}) since users does not store any data referenced by the name 'qwerty')
// 2. userInfoObj maps to more than one user
// 3. userInfoObj maps to no users
db.getUser = (userInfoObj) => {
};



db.getTrails = (trailInfoObj) => {
};

db.getTrail = (trailInfoObj) => {
};

// Returns a promise containing the stored trail data
//
// Exception:
// 1. trailName has already been taken (names must be unique)
db.createTrail = (trailName) => {
};



db.getPosts = (infoObj) => {
};

db.getPost = (infoObj) => {
};

db.createPost = () => {
};




module.exports = db;