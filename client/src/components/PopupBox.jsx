import React, {Component} from 'react'

// In the interest of modularization, I'm putting the bubbles populated by the markers in this component.
//Aware of the fact that the variable names are remarkably circuitious, this could be fixed in redux.


//TrailPage button currently doesn't go anywhere until we get trail pages built out.
class Box extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h3>{this.props.marker.name}</h3>
        <button> Trail Page </button>
      </div>
    )
  }
}

export default Box
