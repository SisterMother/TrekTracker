# Project Title

Welcome to Trek Tracker! Here you can search for trails near you, upload photos, and see others! Pictures can be viewed in lists which are either associated with a user or trail. Any picture can be viewed, but to submit a new photo, you need to login with a Google account. 

## Getting Started

* Initially, npm install in the root of the repo. 
Steps: 
* I. initialize the database: 
  * -make sure mysql and mysql2 is install locally
  * -run `mysql.server start`
  * -run `mysql -u student`
    * -If there is no student profile, create one with the password 'student', otherwise the database/config.json development object can be changed to a username and password currently existing. For the default mysql profile, change username to 'root', and password to an empty string. 
  * -create a database for this app by running the following command in the mysql shell opened from the previous step: `CREATE DATABASE TrekTracker`
  * -the tables and are automatically built with the correct columns if they do not already exist
  * -Database good to go! 
* II. Transpile the code: 
  * -in a new terminal tab, run `npm run react-dev`
* III. Start the server
  * -in a new terminal tab, run `npm run server-dev`
* IV. Open in browser
  * -open a new web browser window and navigate to `localhost:3000`

## Program Architecture 

**Client**
* In the index.jsx, the flow of the program is controlled with react router dependent rendering. 
* Without loggin in, users can see trails in the Home component and display the associated posts after clicking `view posts`.
* After loggin in, the upload component becomes available in Trail.jsx

**Server**
* api-router
  * /currentUser
  * /posts/[users || trails]
    * posts to, or gets from, the database Posts table. They can be queried to return wither a list of posts by a particular user, or from a specific trail. 
  * /trails
    * posts to, or gets from, the database Trails table. They can be queried to get all trails currently stored, or a specific trail by id. 
* auth-router
  * for redirect to authenticate via users Google profile

**Database**


**APIs**
* imgur
  * stores images, a URL is returned, which is then stored in the database along with additional metadata
* Google maps
  * to displays a google map on the page to be populated by nearby trails
* Trails
  * gets all nearby trails, to then be placed in the rendered map


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [React](https://facebook.github.io/react/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency package management
* [AXIOS](https://www.npmjs.com/package/axios) - Handle server calls
* [BABEL](https://babeljs.io/) - code transpiler
* [CHAI](http://chaijs.com/) - testing
* [MYSQL](https://www.mysql.com/) - database
* [PASSPORT](http://passportjs.org/) - authentication
* [SEQUELIZE](http://docs.sequelizejs.com/)

## Authors

* **Jacob Penney** - [OneCent01](https://github.com/OneCent01)
* **Thomas Volk** - [tvolk131](https://github.com/tvolk131)
* **Brendan Bansavage** - [brendanusa](https://github.com/brendanusa)
* **Samuel Davis** - [Sam0064](https://github.com/Sam0064)

See also the list of [contributors](https://github.com/SisterMother/TrekTracker/graphs/contributors) who participated in this project. **The commits here are inaccurate and do not reflect the amount of work each member put in.**

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

