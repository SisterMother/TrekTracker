var helpers = require('./helpers.js');
var models = require('./models');



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
  })
  .then((posts) => {
    var nonreferencedPosts = JSON.parse(JSON.stringify(posts));
    return replaceReferenceModelIdsWithModels(nonreferencedPosts, 'trail_id', models.trails, 'trail')
    .then((posts) => {
      return replaceReferenceModelIdsWithModels(nonreferencedPosts, 'poster_user_id', models.users, 'poster');
    });
  });
};

module.exports.getPostsByTrailId = (id) => {
  return helpers.getPosts({trail_id: id});
};

module.exports.getPostsByTrailName = (name) => {
  return module.exports.getTrailByName(name)
  .then((trail) => {
    return helpers.getPosts({trail_id: trail.id});
  })
  .then((posts) => {
    var nonreferencedPosts = JSON.parse(JSON.stringify(posts));
    return replaceReferenceModelIdsWithModels(nonreferencedPosts, 'trail_id', models.trails, 'trail')
    .then((posts) => {
      return replaceReferenceModelIdsWithModels(nonreferencedPosts, 'poster_user_id', models.users, 'poster');
    });
  });
};

// posterData can be either a user ID or a user email (REMEMBER: user IDs are STRINGS, NOT numbers)
// trailData can be either a trail ID or a trail name
// posterDataType should either be 'id' or 'email'
module.exports.createPost = (posterData, posterDataType, trailData, title, text, imageUrl) => {
  var posterId;
  var trailId;
  if (posterDataType === 'id') {
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

// Used when getting an array of models that contain foreign keys
// and, for each instance in the array, will replace the foreign
// key with the model it is pointing to
//
// modelArray - the array of existing models where each model contains a foreign ID
// idToReplace - a string representing the name of the foreign key that will be replaced
// modelToReplaceWith - the sequelize model that will be searched for using the foreign key
// modelKey - the key where the new foreign-referenced model will be replaced within each element of modelArray
var replaceReferenceModelIdsWithModels = (modelArray, idToReplace, modelToReplaceWith, modelKey) => {
  var getModelPromises = []; // An array of promises, one for each model in the model array
  modelArray.forEach((model) => {
    var referenceModelId = model[idToReplace];
    delete model[idToReplace];
    getModelPromises.push(
      modelToReplaceWith.findOne({
        where: {
          id: referenceModelId
        }
      })
      .then((referenceModel) => {
        model[modelKey] = referenceModel;
        return model;
      })
    );
  });
  return Promise.all(getModelPromises);
};