import React from 'react'

const ListEntry = (props) => (
  <div className = 'TrailListEntry'>
    <h2>{props.currentMarker.name} </h2>
    <h3>{props.currentMarker.city}</h3>
    <h3>{props.currentMarker.state}</h3>
  </div>

)



export default ListEntry;
