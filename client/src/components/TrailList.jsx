import React from 'react'
import ListEntry from './TrailListEntry.jsx'

const TrailList = (props) => (
  <div className = 'TrailList'>
    {props.markers.map((marker, index) =>
      <ListEntry key={index} trail={marker} onClick={props.onClick} />
    )}
  </div>
)

export default TrailList