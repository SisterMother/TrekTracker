import React, {Component} from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

class Map extends Component {
  constructor (props) {
    super(props)
  }

render() {
  return (
    <GoogleMap
      defaultZoom={16}
      ref={this.props.handleMapMounted}
      center={this.props.mapCenter}
      >,
      <Marker
        position={this.props.mapCenter}
       />
		</GoogleMap>
  )
}
}

  export default withGoogleMap(Map);
