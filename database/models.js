'use strict';

var env = process.env.NODE_ENV || 'development';
var config = require('./config.json')[env];
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var models = {};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

// ----------------- //
// ---- SCHEMAS ---- //
// ----------------- //

// USERS SCHEMA
var Users = sequelize.define('users', {
  // This is the Google account ID of the user
  id: {
    primaryKey: true,
    type: Sequelize.STRING,
    unique: true
  },
  firstname: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
});
models.users = Users;

// TRAILS SCHEMA
var Trails = sequelize.define('trails', {
  id: {
    primaryKey: true,
    unique: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    notEmpty: true,
    allowNull: false
  },
  latitude: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false
  },
  longitude: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false
  },
  directions: {
    type: Sequelize.text
  }
});
models.trails = Trails;

// POSTS SCHEMA
var Posts = sequelize.define('posts', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false
  },
  text: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false
  },
  image_url: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false
  },
  view_count: {
    type: Sequelize.INTEGER,
    notEmpty: true,
    allowNull: false
  },
  flag_count: {
    type: Sequelize.INTEGER,
    notEmpty: true,
    allowNull: false
  },
  latitude: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false
  },
  longitude: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false
  }
  // TODO - Somehow store image metadata
});
Posts.belongsTo(Users, {
  foreignKey: 'poster_user_id'
});
Posts.belongsTo(Trails, {
  foreignKey: 'trail_id'
});
models.posts = Posts;


// Sync database
models.sequelize.sync().then(() => {
  console.log('Nice! Database looks fine.');
}).catch((err) => {
  console.log('Uh oh. something went wrong when updating the database.');
  console.error(err);
});


module.exports = models;