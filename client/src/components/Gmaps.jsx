import React, {Component} from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import SearchBox from 'react-google-maps/lib/places/SearchBox'

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

class Map extends Component {

	render() {

		return (
			<GoogleMap
				defaultZoom={15}
        ref={this.props.handleMapMounted}
				center={this.props.mapCenter}
        onClick={this.props.onMapClick}
        onDragEnd={this.props.onDragEnd}

        >
        {this.props.markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          onClick={() => this.props.onMarkerClick(marker)}
         >,
        {marker.showInfo && (
          <InfoWindow
          onCloseClick={() => this.props.onMarkerClose(marker)}>
          <div>
            <form onSubmit={this.props.submit}>
              <h2>Upload trek pic!</h2>
              <input className='input' onChange={() => this.props.update()} type="file"/>
              <button style={{position:"relative",left:"10px",backgroundColor:"papayawhip"}}>Submit</button>
            </form>
            <div className="preview">
              <p>No files currently selected for upload</p>
            </div>
          </div>
          </InfoWindow>
        )}
        </Marker>
        ))}
				<SearchBox
				  ref={this.props.onSearchBoxMounted}
				  onPlacesChanged={this.props.onPlacesChanged}
		 			controlPosition={google.maps.ControlPosition.TOP_LEFT}
		 			inputPlaceholder="Search For Locations!!"
					inputStyle={INPUT_STYLE}
	 			/>

			</GoogleMap>
			)
    }
  }

  export default withGoogleMap(Map);
