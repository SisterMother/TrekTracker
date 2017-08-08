var helpers = require('./helpers.js');



module.exports.getUserById = (id) => {
  return helpers.getUser({id});
};

module.exports.getUserByEmail = (email) => {
  return helpers.getUser({email});
};

module.exports.getAllUsers = () => {
  return helpers.getUsers();
};



module.exports.getTrailById = (id) => {
  return helpers.getTrail({id});
};

module.exports.getTrailByName = (name) => {
  return helpers.getTrail({name});
};

module.exports.getAllTrails = () => {
  return helpers.getTrails();
};

module.exports.createTrail = (name) => {
  return helpers.createTrail(name);
};



module.exports.getPostById = (id) => {
  return helpers.getPost({id});
};

module.exports.getPostsByUserId = (id) => {
  return helpers.getPosts({poster_user_id: id});
};

module.exports.getPostsByUserEmail = (email) => {
  return module.exports.getUserByEmail(email)
  .then((user) => {
    return helpers.getPosts({poster_user_id: user.id});
  });
};

module.exports.getPostsByTrailId = (id) => {
  return helpers.getPosts({trail_id: id});
};

module.exports.getPostsByTrailName = (name) => {
  return module.exports.getTrailByName(name)
  .then((trail) => {
    return helpers.getPosts({trail_id: trail.id});
  });
};

module.exports.createPost = (posterId, trailId, title, text, imageUrl) => {
  return helpers.createPost(posterId, trailId, title, text, imageUrl);
};