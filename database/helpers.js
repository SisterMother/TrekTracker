var models = require('./models.js');
var Sequelize = models.Sequelize;

var db = {};

var getModelsWithInfo = (model, infoObj) => {
  if (infoObj === undefined) {
    return model.findAll();
  }
  if (infoObj !== null && infoObj.constructor === Object) {
    return model.findAll({
      where: infoObj
    });
  }
  return new Promise((resolve, reject) => {
    resolve(null);
  });
};
var getModelWithInfo = (getModelsHelperFn, infoObj) => {
  if (infoObj && infoObj.constructor === Object) {
    return getModelsHelperFn(infoObj)
    .then((models) => {
      if (models.length === 1) {
        return models[0];
      } else {
        return new Promise((resolve, reject) => {
          resolve(null);
        });
      }
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }
};

// Gets all users that strictly match non-unique data (firstname and lastname in the case of users)
// See db.getUser() docs for details and examples
// If no object is passed in, the promise will resolve to all users
//
// Exceptions:
// 1. userInfoObj is not either an object or undefined
// 2. userInfoObj references data that is not stored for users (Check the models.js file to see what you can reference)
db.getUsers = (userInfoObj) => {
  return getModelsWithInfo(models.users, userInfoObj);
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
// 1. userInfoObj is not an object
// 2. userInfoObj references data that is not stored for users (Check the models.js file to see what you can reference, IE: db.getUser({qwerty: 'test}) would not work since users does not store any data referenced by the name 'qwerty')
// 3. userInfoObj maps to more than one user
// 4. userInfoObj maps to no users
db.getUser = (userInfoObj) => {
  return getModelWithInfo(db.getUsers, userInfoObj);
};


// Similar to getUsers(), but for trails
//
// Exceptions:
// 1. trailInfoObj is not either an object or undefined
// 2. trailInfoObj references data that is not stored for trails (Check the models.js file to see what you can reference)
db.getTrails = (trailInfoObj) => {
  return getModelsWithInfo(models.trails, trailInfoObj);
};

// Similar to getUser(), but for trails
//
// Exceptions:
// 1. trailInfoObj is not an object
// 2. trailInfoObj references data that is not stored for trails (Check the models.js file to see what you can reference)
// 3. trailInfoObj maps to more than one trail
// 4. trailInfoObj maps to no trails
db.getTrail = (trailInfoObj) => {
  return getModelWithInfo(db.getTrails, trailInfoObj);
};

// Returns a promise containing the stored trail data
//
// Exception:
// 1. trailName is not a string/is empty string
// 2. trailName has already been taken (names must be unique)
db.createTrail = (trailName) => {
  return models.trails.create({
    name: trailName
  });
};



// Similar to getUsers(), but for posts
//
// Exceptions:
// 1. postInfoObj is not an object
// 2. postInfoObj references data that is not stored for posts (Check the models.js file to see what you can reference)
db.getPosts = (postInfoObj) => {
  return getModelsWithInfo(models.posts, postInfoObj);
};

// Similar to getUser(), but for posts
//
// Exceptions:
// 1. postInfoObj is not an object
// 2. postInfoObj references data that is not stored for posts (Check the models.js file to see what you can reference)
db.getPost = (postInfoObj) => {
  return getModelWithInfo(db.getPosts, postInfoObj);
};

// Returns a promise that will resolve to the
// post data that has been stored to the database
//
// Exceptions:
// TODO - Add exceptions
db.createPost = (posterId, trailId, title, text, imageUrl) => {
  // TODO - Make viewcount and flagcount default to zero
  models.posts.create({
    title: title,
    text: text,
    image_url: imageUrl,
    view_count: 0,
    flag_count: 0,
    poster_user_id: posterId,
    trail_id: trailId
  });
};




module.exports = db;