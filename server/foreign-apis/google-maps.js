var axios = require('axios');

let getPlaces = (callback) => {
  let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=boba&location=37.7836966,-122.4089664&radius=4828.03&key=AIzaSyCD-p-TbPJ35ULnDIOL8X1cmBlEdqTNmb4';

  return axios.get(url);
}

module.exports.getPlaces = getPlaces;
