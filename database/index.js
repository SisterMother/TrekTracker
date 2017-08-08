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

// posterData can be either a user ID or a user email
// trailData can be either a trail ID or a trail name
module.exports.createPost = (posterData, trailData, title, text, imageUrl) => {
  var posterId;
  var trailId;
  if (posterData.constructor === Number) {
    posterId = posterData;
  }
  if (trailData.constructor === Number) {
    trailId = trailData;
  }
  var createPost = () => {
    return helpers.createPost(posterId, trailId, title, text, imageUrl);
  };

  if (posterId && trailId) {
    // posterData and trailData were both IDs
    return createPost();
  } else if (posterId) {
    // posterData was an ID and trailData was a trail name
    return module.exports.getTrailByName(trailData)
    .then((trail) => {
      trailId = trail.id;
      return createPost();
    });
  } else if (trailId) {
    // trailData was an ID and posterData was a user email
    return module.exports.getUserByEmail(posterData)
    .then((user) => {
      posterId = user.id;
      return createPost();
    });
  } else {
    // posterData was an email and trailData was a trail name
    return module.exports.getUserByEmail(posterData)
    .then((user) => {
      posterId = user.id;
      return module.exports.getTrailByName(trailData);
    })
    .then((trail) => {
      trailId = trail.id;
      return createPost();
    });
  }
};