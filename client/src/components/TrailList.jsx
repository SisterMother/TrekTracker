import React from 'react'
import ListEntry from './TrailListEntry.jsx'

const List = (props) => (
<div className = 'TrailList'>
<ul> {props.markers.map(marker =>
      <ListEntry currentMarker = {marker} />
      )}
</ul>
</div>
)




export default List
