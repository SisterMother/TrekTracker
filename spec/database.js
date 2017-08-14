const sinon = require('sinon');
const env = process.env.NODE_ENV || 'development';
const Sequelize = require('sequelize');
const dbConfig = require('../database/config.json')[env];
const expect = require('chai').use(require('chai-as-promised')).expect;
let models = require('../database/models.js');
let sequelize = models.sequelize;
let dbFuncs = require('../database/index.js');
let db = require('./mockdb.json');

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

  describe('Export Functions', () => {
    // Forcefully sync database before testing
    before(() => {
      return sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
      .then(() => {
        return sequelize.sync({force: true});
      })
      .then(() => {
        return sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      })
      .then(() => {
        return sequelize.sync();
      })
      .then(() => {
        let promises = [];
        for (let i = 0; i < db.users.length; i++) {
          promises.push(
            models.users.create(db.users[i])
          );
        }
        for (let i = 0; i < db.trails.length; i++) {
          promises.push(
            models.trails.create(db.trails[i])
          );
        }
        return Promise.all(promises);
      });
    });

    // Wipe database when done testing
    after(() => {
      return sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
      .then(() => {
        return sequelize.sync({force: true});
      })
      .then(() => {
        return sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      })
      .then(() => {
        return sequelize.sync();
      });
    });

    describe('getUserByEmail()', () => {
      it('Should exist', () => {
        expect(dbFuncs.getUserByEmail).to.exist;
      });
      it('Should be a function', () => {
        expect(dbFuncs.getUserByEmail).to.be.a('function');
      });
      it('Should retrieve a user if they are registered to the given email', () => {
        return dbFuncs.getUserByEmail(db.users[0].email)
        .then((user) => {
          expect(user).to.exist;
          expect(user.email).to.equal(db.users[0].email);
        });
      });
      it('Should reject if no user exists with the current email', () => {
        return expect(dbFuncs.getUserByEmail('thisisa@fake.email')).to.be.rejected;
      });
    });

    describe('getTrailsByName()', () => {
      it('Should exist', () => {
        expect(dbFuncs.getTrailsByName).to.exist;
      });
      it('Should be a function', () => {
        expect(dbFuncs.getTrailsByName).to.be.a('function');
      });
      it('Should retrieve a trail if it exists in the database', () => {
        return dbFuncs.getTrailsByName(db.trails[0].name)
        .then((trails) => {
          expect(trails).to.exist;
          expect(trails.length).to.equal(1);
          expect(trails[0].createdAt).to.exist;
          expect(trails[0].updatedAt).to.exist;
          expect(trails[0].id).to.equal(db.trails[0].id);
          expect(trails[0].name).to.equal(db.trails[0].name);
          expect(trails[0].latitude).to.equal(db.trails[0].latitude);
          expect(trails[0].longitude).to.equal(db.trails[0].longitude);
        });
      });
      it('Should retrieve an empty array if querying a trail name that corresponds to no trails', () => {
        return expect(dbFuncs.getTrailsByName('notarealtrail')).to.eventually.deep.equal([]);
      });
      it('Should reject if passed in undefined', () => {
        return expect(dbFuncs.getTrailsByName(undefined)).to.be.rejected;
      });
      it('Should reject if passed in null', () => {
        return expect(dbFuncs.getTrailsByName(null)).to.be.rejected;
      });
    });

    describe('getAllTrails()', () => {
      it('Should exist', () => {
        expect(dbFuncs.getAllTrails).to.exist;
      });
      it('Should be a function', () => {
        expect(dbFuncs.getAllTrails).to.be.a('function');
      });
      it('Should retrieve all trails', () => {
        return dbFuncs.getAllTrails()
        .then((trails) => {
          expect(trails.length).to.equal(db.trails.length);
          for (let i = 0; i < trails.length; i++) {
            expect(trails[i].createdAt).to.exist;
            expect(trails[i].updatedAt).to.exist;
            expect(trails[i].id).to.equal(db.trails[i].id);
            expect(trails[i].name).to.equal(db.trails[i].name);
            expect(trails[i].latitude).to.equal(db.trails[i].latitude);
            expect(trails[i].longitude).to.equal(db.trails[i].longitude);
          }
        });
      });
    });

    describe('createTrail()', () => {
      it('Should exist', () => {
        expect(dbFuncs.createTrail).to.exist;
      });
      it('Should be a function', () => {
        expect(dbFuncs.createTrail).to.be.a('function');
      });
      it('Should create a trail when using all valid parameters', () => {
        let name = 'new trail';
        let directions = 'just look it up on google maps';
        let latitude = 4;
        let longitude = 8;
        return dbFuncs.createTrail(name, directions, latitude, longitude)
        .then((trail) => {
          expect(trail).to.exist;
          expect(trail.id).to.exist;
          expect(trail.createdAt).to.exist;
          expect(trail.updatedAt).to.exist;
          expect(trail.name).to.equal(name);
          expect(trail.directions).to.equal(directions);
          expect(trail.latitude).to.equal(latitude);
          expect(trail.longitude).to.equal(longitude);
        });
      });
      it('Should reject when name is not a string', () => {
        return expect(dbFuncs.createTrail(null, 'directions', 1, 1)).to.be.rejected;
      });
      it('Should reject when directions is not a string', () => {
        return expect(dbFuncs.createTrail('name', null, 1, 1)).to.be.rejected;
      });
    });

    // describe('getPostsByUserEmail()', () => {
    //   it('Should exist', () => {
    //     expect(exports.getPostsByUserEmail).to.exist;
    //   });
    //   it('Should be a function', () => {
    //     expect(exports.getPostsByUserEmail).to.be.a('function');
    //   });
    // });

    // describe('getPostsByTrailName()', () => {
    //   it('Should exist', () => {
    //     expect(exports.getPostsByTrailName).to.exist;
    //   });
    //   it('Should be a function', () => {
    //     expect(exports.getPostsByTrailName).to.be.a('function');
    //   });
    // });

    // describe('createPost()', () => {
    //   it('Should exist', () => {
    //     expect(exports.createPost).to.exist;
    //   });
    //   it('Should be a function', () => {
    //     expect(exports.createPost).to.be.a('function');
    //   });
    // });
  });
};