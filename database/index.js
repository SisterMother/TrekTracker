var models = require('./models');

module.exports.getUserByEmail = (email) => {
  return models.users.findOne({
    where: {email}
  })
  .then((user) => {
    if (user) {
      return user;
    } else {
      return new Promise((resolve, reject) => {
        reject('There is no user registered under the email ' + email);
      });
    }
  });
};

module.exports.getTrailsByName = (name) => {
  if (!name || name.constructor !== String) {
    return new Promise((resolve, reject) => {
      reject('Expected a string but instead was passed in ' + name);
    });
  }

  return models.trails.findAll({
    where: {name}
  })
  .then((trails) => {
    for (let i = 0; i < trails.length; i++) {
      trails[i].latitude = parseFloat(trails[i].latitude);
      trails[i].longitude = parseFloat(trails[i].longitude);
    }
    return trails;
  });
};

module.exports.getAllTrails = () => {
  return models.trails.findAll()
  .then((trails) => {
    for (let i = 0; i < trails.length; i++) {
      trails[i].latitude = parseFloat(trails[i].latitude);
      trails[i].longitude = parseFloat(trails[i].longitude);
    }
    return trails;
  });
};

//consider refactoring
module.exports.createTrail = (id, name, directions = '', latitude = 0, longitude = 0, description = '', traillength = 0) => {
  if (!name || name.constructor !== String) {
    return new Promise((resolve, reject) => {
      reject('Expected trail name to be a non-empty string, but instead got ' + name);
    });
  }
  if (directions === undefined || directions === null || directions.constructor !== String) {
    return new Promise((resolve, reject) => {
      reject('Expected trail directions to be a string, but instead got ' + directions);
    });
  }
  if (description === undefined || description === null || description.constructor !== String) {
    return new Promise((resolve, reject) => {
      reject('Expected trail description to be a string, but instead got ' + description);
    });
  }
  if (traillength === undefined || traillength === null || traillength.constructor !== String) {
    return new Promise((resolve, reject) => {
      reject('Expected trail description to be a string, but instead got ' + traillength);
    });
  }

  return models.trails.findOne({
    where: {id}
  })
  .then((trail) => {
    // If a trail with this ID already exist, don't attempt to create another one
    if (trail) {
      trail.latitude = parseFloat(trail.latitude);
      trail.longitude = parseFloat(trail.longitude);
      return trail;
    }
    return models.trails.create({
      id, name, directions, latitude, longitude, description, traillength
    });
  })
  .catch( err => console.log(err));
};



// posterData can be either a user ID or a user email (REMEMBER: user IDs are STRINGS, NOT numbers)
// trailData can be either a trail ID or a trail name
// posterDataType should either be 'id' or 'email'
module.exports.createPost = (posterEmail, trailId, title, text, imageUrl, latitude=0, longitude=0) => {
  if (!posterEmail || posterEmail.constructor !== String) {
    return new Promise((resolve, reject) => {
      reject('Expected poster email to be a string, but instead it was ' + posterEmail);
    });
  }
  if (!title || title.constructor !== String) {
    return new Promise((resolve, reject) => {
      reject('Expected title to be a string, but instead it was ' + title);
    });
  }
  if (!text || text.constructor !== String) {
    return new Promise((resolve, reject) => {
      reject('Expected text to be a string, but instead it was ' + text);
    });
  }
  if (!imageUrl || imageUrl.constructor !== String) {
    return new Promise((resolve, reject) => {
      reject('Expected image url to be a string, but instead it was ' + imageUrl);
    });
  }

  return module.exports.getUserByEmail(posterEmail)
  .then((poster) => {
    return models.posts.create({
      title,
      text,
      image_url: imageUrl,
      view_count: 0,
      flag_count: 0,
      latitude,
      longitude,
      poster_user_id: poster.id,
      trail_id: trailId
    });
  });
};

// Catch could be used instead of if statements to make it shorter, but the statements are helpful for debugging.
module.exports.createEvent = (creatorEmail, trailId, eventTitle, eventDesc, eventStart, eventEnd, eventContact) => {
  if (!creatorEmail || creatorEmail.constructor !== String) {
    return new Promise((resolve, reject) => {
      reject('Expected the event creator email to be a string, but instead it was ' + creatorEmail);
    });
  }
  if (!eventTitle || eventTitle.constructor != String) {
    return new Promise((resolve, reject) => {
      reject('Expected the title to be a string, but instead it was ' + eventTitle);
    });
  }
  if (!eventDesc || eventDesc.constructor != String) {
    return new Promise((resolve, reject) => {
      reject('Expected the description to be a string, but instead it was ' + eventDesc);
    });
  }
  if (!eventStart || eventStart.constructor != String) {
    return new Promise((resolve, reject) => {
      reject('Expected the start time to be a string, but instead it was ' + eventStart);
    });
  }
  if (!eventEnd || eventEnd.constructor != String) {
    return new Promise((resolve, reject) => {
      reject('Expected the end time to be a string, but instead it was ' + eventEnd);
    });
  }
  if (!eventContact || eventContact.constructor != String) {
    return new Promise((resolve, reject) => {
      reject('Expected the contact time to be a string, but instead it was ' + eventContact);
    });
  }
  return module.exports.getUserByEmail(creatorEmail)
  .then(
    (event) => {
    return models.events.create({
      title: eventTitle,
      desc: eventDesc,
      start: eventStart,
      end: eventEnd,
      contact: eventContact,
      creator_user_id: event.id,
      trail_id: trailId
    });
  })
};

module.exports.getPostsByUserEmail = (email) => {
  return module.exports.getUserByEmail(email)
  .then((user) => {
    return models.posts.findAll({
      where: {
        poster_user_id: user.id
      }
    })
    .then((posts) => {
      for (let i = 0; i < posts.length; i++) {
        posts[i].latitude = parseFloat(posts[i].latitude);
        posts[i].longitude = parseFloat(posts[i].longitude);
        posts[i].poster_user_id = parseInt(posts[i].poster_user_id);
      }
      return replaceReferenceModelIdsWithModels(posts, 'poster_user_id', models.users, 'poster');
    });
  });
};

module.exports.getPostsByTrailId = (id) => {
  return models.posts.findAll({
    where: {trail_id: id}
  })
  .then((posts) => {
    for (let i = 0; i < posts.length; i++) {
      posts[i].latitude = parseFloat(posts[i].latitude);
      posts[i].longitude = parseFloat(posts[i].longitude);
      posts[i].poster_user_id = parseInt(posts[i].poster_user_id);
    }
    return replaceReferenceModelIdsWithModels(posts, 'poster_user_id', models.users, 'poster');
  });
};

// Used when getting an array of models that contain foreign keys
// and, for each instance in the array, will replace the foreign
// key with the model it is pointing to
//
// modelArray - the array of existing models where each model contains a foreign ID
// idToReplace - a string representing the name of the foreign key that will be replaced
// modelToReplaceWith - the sequelize model that will be searched for using the foreign key
// modelKey - the key where the new foreign-referenced model will be replaced within each element of modelArray
let replaceReferenceModelIdsWithModels = (modelArrayImmutable, idToReplace, modelToReplaceWith, modelKey) => {
  let modelArray = JSON.parse(JSON.stringify(modelArrayImmutable));
  let getModelPromises = []; // An array of promises, one for each model in the model array
  modelArray.forEach((model) => {
    let referenceModelId = model[idToReplace];
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
  return Promise.all(getModelPromises)
  .then(() => {
    return modelArray;
  });
};
