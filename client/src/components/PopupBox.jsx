import React, {Component} from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

// In the interest of modularization, I'm putting the bubbles populated by the markers in this component.
//Aware of the fact that the variable names are remarkably circuitious, this could be fixed in redux.


//TrailPage button currently doesn't go anywhere until we get trail pages built out.
class Box extends Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    console.log(props.trail);
  }

  redirect () {
    window.location.href = '/trail?id=' + this.props.trail.trailId;
  }

  render () {
    return (
      <Card>
        <CardHeader
          title={this.props.trail.name}
          subtitle={this.props.trail.city + ', ' + this.props.trail.state}
        />
        <CardActions>
          <FlatButton label='View Posts' onClick={this.redirect} />
        </CardActions>
      </Card>
    )
  }
}

export default Box
