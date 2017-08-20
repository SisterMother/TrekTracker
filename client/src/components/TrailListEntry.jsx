import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

class TrailListEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Card>
        <CardHeader
          title={this.props.trail.name}
          subtitle={this.props.trail.city + ', ' + this.props.trail.state}
        />
        <CardActions>
          <FlatButton label='View on Map' onClick={this.props.onClick.bind(this, this.props.trail)} />
        </CardActions>
      </Card>
    );
  }
}

export default TrailListEntry;