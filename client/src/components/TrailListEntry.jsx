import React from 'react'
const ListEntry = (props) => (
  <div className = 'TrailListEntry'  onClick = {props.onClick.bind(this, props.trail)} >
    <h2>{props.trail.name} </h2>
    <h3>{props.trail.city}</h3>
    <h3>{props.trail.state}</h3>
  </div>
)

export default ListEntry;