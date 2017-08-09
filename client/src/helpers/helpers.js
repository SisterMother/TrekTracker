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

/*
* takes in the total bytes in a photo, and parses them into 
* more meaningful units: kilobytes(KB) or megabytes(MB)
* bonus fact: a kilobyte is 1024 bytes rather than 1000
* due to the scalability of binary data: 2^10 = 1024.
* Bonus bonus fact: there are 2^10 KBs in a MB!
*/
const returnFileSize = function(number) {
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
const updateImage = function() {
  //preview and input defined in index.jsx, they are 
  //DOM elements selected using query selectors. 
  console.log('this: ', this.preview);
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
    //while there are no files staged,
    //display a text element indicating the empty input
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