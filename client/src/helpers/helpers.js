const axios = require('axios');
/*
* In order to further modularize, functions not directly
* interacting with the DOM or passed between files are placed
* here and exported. Trust the cryptic mystery boxes.
*/

//these are the file formats that our program will accept-
//~this function supports segregation of files, but probably not people~
const fileTypes = [
  'image/jpeg',
  'image/pjpeg',
  'image/png'
]

//check to see if the file uploaded to the DOM matches
//the specified file types.
const isValidFileType = function (file) {
  for(var i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

/*
* takes in the total bytes in a photo, and parses them into
* more meaningful units: kilobytes(KB) or megabytes(MB)
* bonus fact: a kilobyte is 1024 bytes rather than 1000
* due to the scalability of binary data: 2^10 = 1024.
* Bonus bonus fact: there are 2^10 KBs in a MB!
*/
const getFileSize = function(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number > 1024 && number < 1048576) {
    //this block runs if the file size is at leadt 1KB,
    //but less than 1MB; bytes are converted to KBs.
    return (number/1024).toFixed(1) + 'KB';
  } else if(number > 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}

/*
* below, updateImage is exported. From there is imported
* into index.jsx, bound to its context, then passed to
* to Update.jsx, where it is called when there is a
* change in the input element accepting photo uploads
*/
module.exports.updateImage = function() {
  //preview and input defined in index.jsx, they are
  //DOM elements selected using query selectors.
  while(this.preview.firstChild) {
    //if the preview element has a child populating it,
    //remove it, then check again
    this.preview.removeChild(this.preview.firstChild);
  }
  //curFiles points to the files currently staged in
  //the input DOM element
  let curFiles = this.input.files;
  //we can set state from this file because it will be
  //bound to the App in index.jsx
  this.setState({photo: curFiles})
  if(curFiles.length === 0) {
    //if there are no files staged,
    //display a text element indicating the empty input
    let para = document.createElement('h2');
    para.textContent = 'No files currently selected for upload';
    this.preview.appendChild(para);
  } else {
    //otherwise, if there is a file staged,
    //create a new div called 'list' and append
    //it to the now empty preview
    let list = document.createElement('div');
    this.preview.appendChild(list);
    for(let i = 0; i < curFiles.length; i++) {
      let listItem = document.createElement('div');
      let para = document.createElement('p');
      if(isValidFileType(curFiles[i])) {
        //if the currently uploaded files are of the valid type,
        //make elements for the image display, subtitle paragraph,
        //and description input
        para.textContent = `File name: ${curFiles[i].name}; File size: ${getFileSize(curFiles[i].size)}.`;
        let desc = document.createElement('textarea');
        let image = document.createElement('img');
        image.style = 'height:200px;border:5px groove darkslategray';
        image.src = window.URL.createObjectURL(curFiles[i]);
        desc.placeholder = 'Describe what you see!';
        desc.rows = '4';
        desc.cols = '50';

        //then append them to the list item
        listItem.appendChild(image);
        listItem.appendChild(para);
        listItem.appendChild(desc);

      } else {
        //otherwise, if the file type is not valid,
        //make only a paragraph element and append to the list item
        para.textContent = `File name: ${curFiles[i].name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }
    //then append the list item to the list
    list.appendChild(listItem);
    }
  }
}

/*
At times, ReactGoogleMaps requires you to call components seperately in order to use them.
Once you call them in this format, you can use native functions that are built into the-
traditional Google Maps application. Note that they must be called in the format shown below.
*/

module.exports.handleMapMounted = function (map) {
  this._map = map;
}

module.exports.handleSearchBoxMounted = function (searchBox)  {
  this._searchBox = searchBox;
}

// When the list of trails is clicked, this sets the mapCenter on the location of the clicked trail.
module.exports.ListClick = function (item) {
  this.setState({mapCenter: {lat: item.position.lat, lng: item.position.lng}});
  //We also want the popup box within the marker to activate upon list click, as that is the way that we access the trail page.
  //More information on the marker click function below.
  this.onMarkerClick(item);
}

//The handlePlacesChanged function is designed for when the search box is used to change the location of the map.
module.exports.handlePlacesChanged = function ()  {
//We need to set a variable for the searchbox in order to use it's native functions. More info above.
  const places = this._searchBox.getPlaces();
  /*
  This basically creates an api call when you submit a location change from the searchbox.
  There is some level of abstration here, but I think that the way it works is this.
  It searches for places based on their name. The searchbox automatically gives you a
  list of places and either chooses the one that you either select, or a list of several that are close to your query.
*/
  const markers = places.map(place => ({
    //From there, we go through the results that are returned to us, and find the position of each of them.
    position: place.geometry.location,
  }));
  //We set a mapCenter variable equal to either the first result of the search, or the current location if nothing is returned.
  const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
  //Lastly, we set the state of the mapcenter to the variable. This change in state will re-render the map with a new center.
  this.setState({
    mapCenter: mapCenter
  });
 }

module.exports.submitImage = function(e) {
  e.preventDefault();
  var form = new FormData();
  form.append('image', this.state.photo[0])
  axios.post('https://api.imgur.com/3/image', form)
  .then((res) => {
    let metaPhoto = {
      title: this.state.photo[0].name,
      text: document.getElementsByTagName('textarea')[0].value,
      image_url: res.data.data.link,
      flag_comments: [],
      trail_id: 1
    };
    return axios.post('/api/posts', {photo: metaPhoto})
      .then(res => console.log('success: ', res))
      .catch(err => console.log('error in the /api/posts endpoint: ', err));
  })
  .catch((err, res) => {
    if(err) {
      console.log('error: ', err);
    }
  });
}

/*
When a marker is clicked we want to open the infowindow.
I couldn't really find an efficient way to do this, so I just
went for a brute force method. All this really does is just
map through the entire marker state until it finds the marker
that was clicked on. Once if finds it, it sets the showInfo to true.
*/
module.exports.onMarkerClick = function (targetMarker) {
  this.setState({
    markers: this.state.markers.map(marker => {
      if (marker === targetMarker) {
        marker.showInfo = true
      } else {
        marker.showInfo = false
      }
      //There are two returns here because of the if statement. If it is triggered we want to return the marker and a modified showinfo property.
      //If it isn't triggred, we still want out map to return our marker.
      return marker;
    }),
    trailPopup: true
  });
}

/*
See the comments for the previous method, they are programatically similar except they change the value of the showInfo property.
*/

module.exports.onMarkerClose = function (targetMarker) {
  this.setState({
    markers: this.state.markers.map(marker => {
      if (marker === targetMarker) {
        marker.showInfo = false;
      }
      return marker;
    }),
    trailPopup: false
  });
}

/*
The following function is designed to update our markers when the map is manually moved by the user.
I chose to use the onDragEnd method because it is more efficent. It is also possible to use an onMapMove
function, the problem with that is it fires for every pixel the map moves. This only fires once the
user has finished moving the map.
*/
module.exports.onDragEnd = function (event) {
  if(!this.state.trailPopup) {
  //trailPopup is designed to fix an error regarding markers disappearing.
  //The first thing we are going to do is find the new center of the map.
  //If you are confused by the this._map call, it is explained above in this file.
  let newCenter = this._map.getCenter()
  //Once we find out what the new center of our map is, we turn the latitude and longitude into variables that we can search.
  let newCenterLat = newCenter.lat();
  let newCenterLng = newCenter.lng();
  this.setState({mapCenter: {lat: newCenterLat, lng: newCenterLng}});
  //We clear the markers array every time the map moves. This is done so that trails that show up in our list
  //are correlated with markers that are actually in the area, or else out list would grow in size
  //with every marker we ever encounter. In the future, there is a Google Maps getBounds function that it may be possible to use.
  this.setState({markers:[]})
  //Once our markers are reset, we make a call in order to find markers in our new location.
  //The following call is the same as the on on the index, which can be referred to for a longer explanation of this process.
    axios.get('/api/trails', {
      params: {
        lat: this.state.mapCenter.lat,
        lng: this.state.mapCenter.lng,
        radius: 10
      }
    })
    .then(res => {
      res.data.places.forEach((trail) => {
        const nextMarkers = [
          ...this.state.markers,
          {
            position: {lat: trail.lat, lng: trail.lon},
            name: trail.name,
            city: trail.city,
            state: trail.state,
          },
        ];
        this.setState({
          markers: nextMarkers,
        });
      });
    })
    .catch(err => {
      console.log('oops, error in the trails call: ', err);
    });
  }
}
