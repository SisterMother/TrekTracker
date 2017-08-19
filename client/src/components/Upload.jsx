import React from 'react';

const Upload = (props) => (
  <div>
    <form onSubmit={props.submit}>
      <h2>Upload trek pic!</h2>
      <input className='input' onChange={() => props.update()} type='file' accept='image/*' capture='camera' />
      <button style={{position:'relative',left:'10px',backgroundColor:'papayawhip'}}>Submit</button>
    </form>
    <div className='preview'>
      <p>No files currently selected for upload</p>
    </div>
  </div>
);

export default Upload;
