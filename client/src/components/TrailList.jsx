import React from 'react'
import ListEntry from './TrailListEntry.jsx'

const List = (props) => (
  <div className = 'TrailList'>
    <ul> {props.markers.map((marker, index) =>
      <ListEntry key={index} trail={marker} onClick={props.onClick} />
      )}
    </ul>
  </div>
)

export default List
