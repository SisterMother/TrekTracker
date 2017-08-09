import React, {Component} from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

class Map extends Component {

	render() {

		return (
			<GoogleMap
				defaultZoom={15}
				defaultCenter={this.props.mapCenter}>


				{this.props.trails.map((business, i) => {
		      let coords = business.geometry.location;

      		return <Marker
      		name={name}
      		showInfo={false}
      		infoContent=
	      		{<svg
	            id="Layer_1"
	            xmlns="http://www.w3.org/2000/svg"
	            width="16"
	            height="16"
	            viewBox="0 0 16 16"
	          />}
      		onClick={() => this.props.onMarkerClick(business)}
      		position={{lat: coords.lat, lng: coords.lng}}
      		key={i}/>
    		})}

			</GoogleMap>
			)
		}
	}

export default withGoogleMap(Map);
