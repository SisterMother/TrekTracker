var sinon = require('sinon');
var path = require('path');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var models = require('../database/models.js');
var helpers = require('../database/helpers.js');
var exports = require('../database/index.js');

console.log(models.users);

module.exports.run = () => {
  describe('Models', () => {
    describe('Users', () => {
      it('Should exist', () => {
        expect(models.users).to.exist;
      });
    });
    describe('Trails', () => {
      it('Should exist', () => {
        expect(models.trails).to.exist;
      });
    });
    describe('Posts', () => {
      it('Should exist', () => {
        expect(models.posts).to.exist;
      });
    });
  });
  describe('Helpers', () => {
    var personOne = {
      id: '123456789',
      firstname: 'Hello',
      lastname: 'World',
      email: 'hello@world.com'
    };
    var personTwo = {
      id: '1234567890',
      firstname: 'Test',
      lastname: 'Person',
      email: 'test@person.com'
    };

    before(() => {
      return models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
      .then(() => {
        return models.sequelize.sync({force: true});
      })
      .then(() => {
        return models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      })
      .then(() => {
        return models.sequelize.sync();
      })
      .then(() => {
        return models.users.create(personOne)
        .then(() => {
          return models.users.create(personTwo);
        });
      });
    });

    beforeEach(() => {
    });

    describe('getUsers()', () => {
      it('Should exist', () => {
        expect(helpers.getUsers).to.exist;
      });
      it('Should be a function', () => {
        expect(helpers.getUsers).to.be.a('function');
      });
      it('Should retrieve correct number of users', () => {
        return helpers.getUsers()
        .then((users) => {
          expect(users.length).to.equal(2);
        });
      });
      it('Should retrieve all users when no input parameter is provided', () => {
        return helpers.getUsers()
        .then((users) => {
          let nonRefUsers = JSON.parse(JSON.stringify(users)); // So that we can edit the users
          nonRefUsers.forEach((user) => {
            delete user.createdAt;
            delete user.updatedAt;
          });
          return nonRefUsers;
        })
        .then((users) => {
          expect(users).to.eql([personOne, personTwo]);
        });
      });
    });
    describe('getUser()', () => {
      it('Should exist', () => {
        expect(helpers.getUser).to.exist;
      });
      it('Should be a function', () => {
        expect(helpers.getUser).to.be.a('function');
      });
      it('Should return a user that matches requirements', () => {
        return helpers.getUser({id: '123456789'})
        .then((user) => {
          let nonRefUser = JSON.parse(JSON.stringify(user));
          delete nonRefUser.createdAt;
          delete nonRefUser.updatedAt;
          return nonRefUser;
        })
        .then((user) => {
          expect(user).to.eql(personOne);
        });
      });
      it('Should return null-resolving promise when no user matches requrements', () => {
        return expect(helpers.getUser({id: 'thisisafakeid'})).to.be.rejected;
      });
      it('Should return null-resolving promise when nothing is passed into the function', () => {
        return expect(helpers.getUser()).to.be.rejected;
      });
    });
    describe('getTrails()', () => {
      it('Should exist', () => {
        expect(helpers.getTrails).to.exist;
      });
      it('Should be a function', () => {
        expect(helpers.getTrails).to.be.a('function');
      });
    });
    describe('getTrail()', () => {
      it('Should exist', () => {
        expect(helpers.getTrail).to.exist;
      });
      it('Should be a function', () => {
        expect(helpers.getTrail).to.be.a('function');
      });
    });
    describe('createTrail()', () => {
      it('Should exist', () => {
        expect(helpers.createTrail).to.exist;
      });
      it('Should be a function', () => {
        expect(helpers.createTrail).to.be.a('function');
      });
    });
    describe('getPosts()', () => {
      it('Should exist', () => {
        expect(helpers.getPosts).to.exist;
      });
      it('Should be a function', () => {
        expect(helpers.getPosts).to.be.a('function');
      });
    });
    describe('getPost()', () => {
      it('Should exist', () => {
        expect(helpers.getPost).to.exist;
      });
      it('Should be a function', () => {
        expect(helpers.getPost).to.be.a('function');
      });
    });
    describe('createPost()', () => {
      it('Should exist', () => {
        expect(helpers.createPost).to.exist;
      });
      it('Should be a function', () => {
        expect(helpers.createPost).to.be.a('function');
      });
    });
  });
  describe('Export Functions', () => {
    describe('getUserByEmail()', () => {
      it('Should exist', () => {
        expect(exports.getUserByEmail).to.exist;
      });
      it('Should be a function', () => {
        expect(exports.getUserByEmail).to.be.a('function');
      });
    });
    describe('getTrailByName()', () => {
      it('Should exist', () => {
        expect(exports.getTrailByName).to.exist;
      });
      it('Should be a function', () => {
        expect(exports.getTrailByName).to.be.a('function');
      });
    });
    describe('getAllTrails()', () => {
      it('Should exist', () => {
        expect(exports.getAllTrails).to.exist;
      });
      it('Should be a function', () => {
        expect(exports.getAllTrails).to.be.a('function');
      });
    });
    describe('createTrail()', () => {
      it('Should exist', () => {
        expect(exports.createTrail).to.exist;
      });
      it('Should be a function', () => {
        expect(exports.createTrail).to.be.a('function');
      });
    });
    describe('getPostsByUserEmail()', () => {
      it('Should exist', () => {
        expect(exports.getPostsByUserEmail).to.exist;
      });
      it('Should be a function', () => {
        expect(exports.getPostsByUserEmail).to.be.a('function');
      });
    });
    describe('getPostsByTrailName()', () => {
      it('Should exist', () => {
        expect(exports.getPostsByTrailName).to.exist;
      });
      it('Should be a function', () => {
        expect(exports.getPostsByTrailName).to.be.a('function');
      });
    });
    describe('createPost()', () => {
      it('Should exist', () => {
        expect(exports.createPost).to.exist;
      });
      it('Should be a function', () => {
        expect(exports.createPost).to.be.a('function');
      });
    });
  });
};