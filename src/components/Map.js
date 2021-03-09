import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'

const Map = ({ center, zoom }) => {
    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys= {{key: "AIzaSyBzARZuhUJBJiNRO8T16Ir3thRMDqWrUpI" }}
                defaultCenter= { center }
                defaultZoom = { zoom }
            >
                <LocationMarker lat={center.lat} lng={center.lng} />
            </GoogleMapReact>
            
        </div>
    )
}

Map.defaultProps = {
    center: {
        lat: 33.9416,
        lng: -118.4085
    },
    zoom: 6
}

export default Map