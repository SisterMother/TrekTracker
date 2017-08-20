import React from 'react'
import ListEntry from './TrailListEntry.jsx'

const List = (props) => (
  <div className = 'TrailList'>
    <ul> {props.markers.map(marker =>
      <ListEntry currentMarker = {marker} ListClick = {props.ListClick} />
      )}
    </ul>
  </div>
)

export default List
