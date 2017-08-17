module.exports.getLocation = () => {
  if (!navigator.geolocation) {
    return new Promise((resolve, reject) => {
      reject('Geolocation not supported on this device');
    });
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
