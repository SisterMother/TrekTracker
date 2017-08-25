var axios = require('axios');
let config;
if (!process.env.NODE_ENV) {
  config = require('../../passport/config.json');
}

const getWeatherByLoc = (lat='34', long='-105') => {
  console.log('these are the parameters sent to the weather query: ', lat, long);
  var WUNDERGROUND_KEY = process.env.WUNDERGROUND_KEY || config.WUNDERGROUND_KEY;
  var urlBuilder = `http://api.wunderground.com/api/`;
  urlBuilder += `${WUNDERGROUND_KEY}`;
  urlBuilder += `/forecast10day/q/`;
  urlBuilder += `${lat},`;
  urlBuilder += `${long}.json`;
  return axios.get(urlBuilder);
};

module.exports.getWeatherByLoc = getWeatherByLoc;