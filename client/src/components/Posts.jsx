import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import time from '../helpers/time.js'

const Posts = (props) => (
  <div>
    {props.posts.map((post, i) => (
      <div key={i}>
        <Card>
          <CardHeader
            title={post.poster.firstname + ' ' + post.poster.lastname}
            subtitle={post.poster.email}
          />
          <CardMedia overlay={<CardTitle title={post.text} subtitle={time.parse(post.createdAt, true)} />}>
            <img src={post['image_url']}/>
          </CardMedia>
        </Card>
      </div>
    ))}
  </div>
);

export default Posts;