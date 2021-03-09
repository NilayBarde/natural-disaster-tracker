import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfo from './LocationInfo'
import EventFilter from './EventFilter'

const EventMap = ({ center, zoom, eventData }) => {
    const [locationInfo, setLocationInfo] = useState(null)

    const events = eventData.map(ev => {
        if (ev.categories[0].id === 8) {
            return <LocationMarker key={ev.id} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} type="wildfire" 
                    onClick={() => setLocationInfo({id: ev.id, title: ev.title})}    />
        } else if (ev.categories[0].id === 10) {
            return <LocationMarker key={ev.id} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} type="storm" 
            onClick={() => setLocationInfo({id: ev.id, title: ev.title})}    />
        } else if (ev.categories[0].id === 12) {
            if (ev.geometries[0].coordinates.length === 1) {
                ev.geometries[0].coordinates.forEach(coord => {
                    return <LocationMarker key={ev.id} lat={coord[1]} lng={coord[0]} type="volcano" 
                    onClick={() => setLocationInfo({id: ev.id, title: ev.title})}    />        
                });

            } else {
                return <LocationMarker key={ev.id} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} type="volcano" 
                onClick={() => setLocationInfo({id: ev.id, title: ev.title})}    />    
            }
        return null
        }
    })
    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys= {{key: "AIzaSyBzARZuhUJBJiNRO8T16Ir3thRMDqWrUpI" }}
                defaultCenter= { center }
                defaultZoom = { zoom }
            >
                {events}
            </GoogleMapReact>
            <EventFilter />
            
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