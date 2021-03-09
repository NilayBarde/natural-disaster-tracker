import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfo from './LocationInfo'

const EventMap = ({ center, zoom, eventData }) => {
    const [locationInfo, setLocationInfo] = useState(null)

    const fires = eventData.map(ev => {
        if (ev.categories[0].id === 8) {
            return <LocationMarker key={ev.id} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} 
                    onClick={() => setLocationInfo({id: ev.id, title: ev.title})}    />
        }
        return null
    })
    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys= {{key: "AIzaSyBzARZuhUJBJiNRO8T16Ir3thRMDqWrUpI" }}
                defaultCenter= { center }
                defaultZoom = { zoom }
            >
                {fires}
            </GoogleMapReact>
            {locationInfo && <LocationInfo info={locationInfo} />}
            
        </div>
    )
}

EventMap.defaultProps = {
    center: {
        lat: 33.9416,
        lng: -118.4085
    },
    zoom: 6
}

export default EventMap