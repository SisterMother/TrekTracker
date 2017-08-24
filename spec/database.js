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
    describe('Events', () => {
      it('Should exist', () => {
        expect(models.events).to.exist;
      });
    });
    describe('InterestedInEvent', () => {
      it('Should exist', () => {
        expect(models.interestedInEvent).to.exist;
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
        for (let i = 0; i < db.events.length; i++) {
          promises.push(
            models.events.create(db.events[i])
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
        let apiId = 12345678
        let name = 'new trail';
        let directions = 'Second trail from the right and straight on until morning';
        let latitude = 4;
        let longitude = 8;
        let description = 'It is beautiful.';
        let traillength = '3';
        return dbFuncs.createTrail(apiId, name, directions, latitude, longitude, description, traillength)
        .then((trail) => {
          expect(trail).to.exist;
          expect(trail.id).to.exist;
          expect(trail.createdAt).to.exist;
          expect(trail.updatedAt).to.exist;
          expect(trail.id).to.equal(apiId);
          expect(trail.name).to.equal(name);
          expect(trail.directions).to.equal(directions);
          expect(trail.latitude).to.equal(latitude);
          expect(trail.longitude).to.equal(longitude);
          expect(trail.description).to.equal(description);
          expect(trail.traillength).to.equal(traillength);
        });
      });
      it('Should return the existing trail when attempting to create a new trail with the same ID as an existing one', () => {
        let apiId = 12345678
        let name = 'different trail';
        let directions = 'Second trail from the right and straight on until morning';
        let latitude = 4;
        let longitude = 8;
        let description = 'It is beautiful.';
        let traillength = '3';
        return dbFuncs.createTrail(apiId, name, directions, latitude, longitude, description, traillength)
        .then((trail) => {
          expect(trail).to.exist;
          expect(trail.id).to.exist;
          expect(trail.createdAt).to.exist;
          expect(trail.updatedAt).to.exist;
          expect(trail.id).to.equal(apiId);
          expect(trail.name).to.equal('new trail');
          expect(trail.directions).to.equal(directions);
          expect(trail.latitude).to.equal(latitude);
          expect(trail.longitude).to.equal(longitude);
          expect(trail.description).to.equal(description);
          expect(trail.traillength).to.equal(traillength);
        });
      });
      it('Should reject when name is not a string', () => {
        return expect(dbFuncs.createTrail(null, 'directions', 1, 1)).to.be.rejected;
      });
      it('Should reject when directions is not a string', () => {
        return expect(dbFuncs.createTrail('name', null, 1, 1)).to.be.rejected;
      });
      it('Should reject when description is not a string', () => {
        return expect(dbFuncs.createTrail(null, 'description', 1, 1)).to.be.rejected;
      });
      it('Should reject when traillength is not a string', () => {
        return expect(dbFuncs.createTrail(null, 'traillength', 1, 1)).to.be.rejected;
      });
    });

    describe('createEvent()', () => {
      it('Should exist', () => {
        expect(dbFuncs.createEvent).to.exist;
      });
      it('Should be a function', () => {
        expect(dbFuncs.createEvent).to.be.a('function');
      });
      it('Should create an event with valid parameters', () => {
        let title = 'Join us for a view from the Top';
        let desc = 'Beautiful vistas are better with friends, so come.';
        let start = '2017, 10, 2, 17, 55';
        let end = '2017, 10, 2, 20, 00';
        let contact = 'test@example.com';
        return dbFuncs.createEvent(db.users[0].email, db.trails[0].id, title, desc, start, end, contact)
        .then((event) => {
          expect(event).to.exist;
          expect(event.createdAt).to.exist;
          expect(event.updatedAt).to.exist;
          expect(event.title).to.equal(title);
          expect(event.desc).to.equal(desc);
          expect(event.start).to.equal(start);
          expect(event.end).to.equal(end);
          expect(event.contact).to.equal(contact);
        });
      });
    })

    // getAllEventsNearLocation

    describe('getAllEventsNearLocations()', ()=>{
      let title = 'Join us for a view from the Top';
      let desc = 'Beautiful vistas are better with friends, so come.';
      let start = '2017, 10, 2, 17, 55';
      let end = '2017, 10, 2, 20, 00';
      let contact = 'test@example.com';
    
      it('Should exist', () =>{
        expect(dbFuncs.getAllEventsNearLocations).to.exist;

      });
      it('Should be a function', () =>{
        expect(dbFuncs.getAllEventsNearLocations).to.be.a('function');


      });
      it('Should be a function return list of events', () =>{
        
        return dbFuncs.getAllEventsNearLocations([1,2])
        
        .then((events) => {
          expect(events).to.be.an('array');
          expect(events).to.exist;
          expect(events[0]).to.exist;
          expect(events[0].createdAt).to.exist;
          expect(events[0].updatedAt).to.exist;
          expect(events[0].title).to.equal(title);
          expect(events[0].desc).to.equal(desc);
          expect(events[0].start).to.equal(start);
          expect(events[0].end).to.equal(end);
          expect(events[0].contact).to.equal(contact);
        });

      });


    });

    //getAllEventsByUserEmail

    describe('getAllEventsByUserEmail()', ()=>{
      let title = 'Join us for a view from the Top';
      let desc = 'Beautiful vistas are better with friends, so come.';
      let start = '2017, 10, 2, 17, 55';
      let end = '2017, 10, 2, 20, 00';
      let contact = 'test@example.com';
    
      it('Should exist', () =>{
        expect(dbFuncs.getAllEventsByUserEmail).to.exist;

      });
      it('Should be a function', () =>{
        expect(dbFuncs.getAllEventsByUserEmail).to.be.a('function');


      });
      it('Should be a function return list of events', () =>{
        
        return dbFuncs.getAllEventsByUserEmail(contact)
        
        .then((events) => {
          expect(events).to.be.an('array');
          expect(events).to.exist;
          expect(events[0]).to.exist;
          expect(events[0].createdAt).to.exist;
          expect(events[0].updatedAt).to.exist;
          expect(events[0].title).to.equal(title);
          expect(events[0].desc).to.equal(desc);
          expect(events[0].start).to.equal(start);
          expect(events[0].end).to.equal(end);
          expect(events[0].contact).to.equal(contact);
        });

      });

    });

    //getEventById
    describe('getEventById()', ()=>{
      let title = 'Join us for a view from the Top';
      let desc = 'Beautiful vistas are better with friends, so come.';
      let start = '2017, 10, 2, 17, 55';
      let end = '2017, 10, 2, 20, 00';
      let contact = 'test@example.com';
    
      it('Should exist', () =>{
        expect(dbFuncs.getEventById).to.exist;

      });
      it('Should be a function', () =>{
        expect(dbFuncs.getEventById).to.be.a('function');


      });
      it('Should be a function return an event', () =>{
        
        return dbFuncs.getEventById(3)
        
        .then((event) => {
          
          expect(event).to.exist;
          expect(event).to.exist;
          expect(event.createdAt).to.exist;
          expect(event.updatedAt).to.exist;
          expect(event.title).to.equal(title);
          expect(event.desc).to.equal(desc);
          expect(event.start).to.equal(start);
          expect(event.end).to.equal(end);
          expect(event.contact).to.equal(contact);
        });

      });

    });

        // getAllEventsByTrailId
    describe('getAllEventsByTrailId()', () => {
      it('Should exist', () => {
        expect(dbFuncs.getAllEventsByTrailId).to.exist;
      });
      it('Should be a function', () => {
        expect(dbFuncs.getAllEventsByTrailId).to.be.a('function');
      });
      it('Should be a function return an event', () =>{
        let title = 'Join us for a view from the Top';
        let desc = 'Beautiful vistas are better with friends, so come.';
        let start = '2017, 10, 2, 17, 55';
        let end = '2017, 10, 2, 20, 00';
        let contact = 'test@example.com';
        return dbFuncs.getAllEventsByTrailId(1)
        
        .then((event) => {
          
          expect(event).to.exist;
          expect(event).to.exist;
          expect(event.createdAt).to.exist;
          expect(event.updatedAt).to.exist;
          expect(event.title).to.equal(title);
          expect(event.desc).to.equal(desc);
          expect(event.start).to.equal(start);
          expect(event.end).to.equal(end);
          expect(event.contact).to.equal(contact);
        });

      });

    });





    describe('createPost()', () => {
      it('Should exist', () => {
        expect(dbFuncs.createPost).to.exist;
      });
      it('Should be a function', () => {
        expect(dbFuncs.createPost).to.be.a('function');
      });
      it('Should create a post with all valid parameters', () => {
        let title = 'Example post title';
        let text = 'Example post text';
        let imageUrl = 'http://exampleurl.com/';
        return dbFuncs.createPost(db.users[0].email, db.trails[0].id, title, text, imageUrl, 0, 0)
        .then((post) => {
          expect(post).to.exist;
          expect(post.createdAt).to.exist;
          expect(post.updatedAt).to.exist;
          expect(post.title).to.equal(title);
          expect(post.text).to.equal(text);
          expect(post.image_url).to.equal(imageUrl);
        });
      });
      it('Should reject when title is not a string', () => {
        return expect(dbFuncs.createPost(db.users[1].email, db.trails[0].id, null, 'text', 'url', 0, 0)).to.be.rejected;
      });
      it('Should reject when text is not a string', () => {
        return expect(dbFuncs.createPost(db.users[1].email, db.trails[0].id, 'title', null, 'url', 0, 0)).to.be.rejected;
      });
      it('Should reject when image url is not a string', () => {
        return expect(dbFuncs.createPost(db.users[1].email, db.trails[0].id, 'title', 'text', null, 0, 0)).to.be.rejected;
      });
    });

    describe('getPostsByUserEmail()', () => {
      it('Should exist', () => {
        expect(dbFuncs.getPostsByUserEmail).to.exist;
      });
      it('Should be a function', () => {
        expect(dbFuncs.getPostsByUserEmail).to.be.a('function');
      });
      it('Should get posts by a particular user', () => {
        let title = 'Example post title';
        let text = 'Example post text';
        let imageUrl = 'http://exampleurl.com/';
        return dbFuncs.getPostsByUserEmail(db.users[0].email)
        .then((posts) => {
          expect(posts).to.exist;
          expect(posts.length).to.equal(1);
          expect(posts[0].createdAt).to.exist;
          expect(posts[0].updatedAt).to.exist;
          expect(posts[0].title).to.equal(title);
          expect(posts[0].text).to.equal(text);
          expect(posts[0].image_url).to.equal(imageUrl);
          expect(posts[0].view_count).to.exist;
          expect(posts[0].flag_count).to.exist;
          expect(posts[0].latitude).to.equal(0);
          expect(posts[0].longitude).to.equal(0);
          expect(posts[0].poster).to.exist;
          expect(posts[0].poster.email).to.equal(db.users[0].email);
        });
      });
    });





    describe('getPostsByTrailName()', () => {
      it('Should exist', () => {
        expect(dbFuncs.getPostsByTrailId).to.exist;
      });
      it('Should be a function', () => {
        expect(dbFuncs.getPostsByTrailId).to.be.a('function');
      });
      it('Should get posts for a particular trail', () => {
        let title = 'Example post title';
        let text = 'Example post text';
        let imageUrl = 'http://exampleurl.com/';
        return dbFuncs.getPostsByTrailId(db.trails[0].id)
        .then((posts) => {
          expect(posts).to.exist;
          expect(posts.length).to.equal(1);
          expect(posts[0].createdAt).to.exist;
          expect(posts[0].updatedAt).to.exist;
          expect(posts[0].title).to.equal(title);
          expect(posts[0].text).to.equal(text);
          expect(posts[0].image_url).to.equal(imageUrl);
          expect(posts[0].view_count).to.exist;
          expect(posts[0].flag_count).to.exist;
          expect(posts[0].latitude).to.equal(0);
          expect(posts[0].longitude).to.equal(0);
          expect(posts[0].poster).to.exist;
          expect(posts[0].poster.email).to.equal(db.users[0].email);
        });
      });
    });

  });
};
