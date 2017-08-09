var expect = require('chai').expect;
var sinon = require('sinon');
var path = require('path');

var models = require('../database/models.js');
var helpers = require('../database/helpers.js');
var exports = require('../database/index.js');
var sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

console.log(models.users);

module.exports.run = () => {
  describe('Sequelize Test', () => {
    var sandbox = null;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
      sandbox = sinon.sandbox.restore();
    });
    sequelizeMockingMocha(models.sequelize, path.resolve(path.join(__dirname, './fake-database.json')), {logging: false});

    it('should test', () => {
      return models.users.findAll()
      .then((users) => {
        expect(users).depp.equals(
          [
            {
              id: 'test',
              firstname: 'example',
              lastname: 'person',
            }
          ]
        );
      });
    });
  });


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
    describe('getUsers()', () => {
      it('Should exist', () => {
        expect(helpers.getUsers).to.exist;
      });
      it('Should be a function', () => {
        expect(helpers.getUsers).to.be.a('function');
      });
    });
    describe('getUser()', () => {
      it('Should exist', () => {
        expect(helpers.getUser).to.exist;
      });
      it('Should be a function', () => {
        expect(helpers.getUser).to.be.a('function');
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