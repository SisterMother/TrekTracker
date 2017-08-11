var axios = require('axios');

// .header("X-Mashape-Key", "IHQ3XC1RKkmshTK87BBsgYa5yC4Ip1rPe6Ljsn4uXZ2dg7awPl")
// .header("Accept", "text/plain")

const getTrailsByLoc = (lat='34', long='-105', limit='25', radius='25') => {
  axios.get(`https://trailapi-trailapi.p.mashape.com/?lat=${lat}&limit=${limit}&lon=${long}&q[activities_activity_type_name_eq]=hiking&radius=${radius}`, {
    headers: {
      'X-Mashape-Key': 'IHQ3XC1RKkmshTK87BBsgYa5yC4Ip1rPe6Ljsn4uXZ2dg7awPl',
      contentType: 'text/plain'
    }
  })
  .then(res => console.log('success!: ', res))
  .catch(err => console.log('failure: ', err));
};

console.log('hi');

module.exports.getTrailsByLoc = getTrailsByLoc;