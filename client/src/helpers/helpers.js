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
const validFileType = function (file) {
  for(var i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

const returnFileSize = function(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number > 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number > 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}

const updateImage = function() {
  while(this.preview.firstChild) {
    this.preview.removeChild(this.preview.firstChild);
  }
  let curFiles = this.input.files;
  this.setState({photo: curFiles})
  if(curFiles.length === 0) {
    let para = document.createElement('h2');
    para.textContent = 'No files currently selected for upload';
    this.preview.appendChild(para);
  } else {
    let list = document.createElement('div');
    this.preview.appendChild(list);
    for(let i = 0; i < curFiles.length; i++) {
      let listItem = document.createElement('div');
      let para = document.createElement('p');
      let desc = document.createElement('textarea');
      if(validFileType(curFiles[i])) {
        para.textContent = `File name: ${curFiles[i].name}; File size: ${returnFileSize(curFiles[i].size)}.`;
        let image = document.createElement('img');
        image.style = 'height:200px;border:5px groove black';
        image.src = window.URL.createObjectURL(curFiles[i]);
        desc.placeholder = 'Describe what you see!';
        desc.rows = '4';
        desc.cols = '50';


        listItem.appendChild(image);
        listItem.appendChild(para);
        listItem.appendChild(desc);

      } else {
        para.textContent = `File name: ${curFiles[i].name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }
    list.appendChild(listItem);
    }
  }
}


module.exports = {
  updateImage: updateImage
}