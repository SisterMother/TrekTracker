import React from 'react';

const UserPosts = (props) => (
  <div>
    {props.posts.map((post, i) => (
      <div key={i}>
        <div style={{display:"inline-block"}}>
          <img style={{border:"3px solid black"}} src={post['image_url']}/>
        </div>
        <div style={{display:"inline-block",paddingLeft:'8px'}}>
          <p>Title: {post.title}</p>
        </div>
      </div>
    ))}
  </div>
);

export default UserPosts;