import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfo from './LocationInfo'
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';

var filteredEvents = []

function getFilteredEvents(onChange) {
    filteredEvents = [];
    for(var i=0; i<onChange.length; i++) {
        if (onChange[i].checked) {
            filteredEvents.push(onChange[i].value)
        }
    }
    console.log(filteredEvents)
}

const EventMap = ({ center, zoom, eventData }) => {
    const [onChange, setOnChange] = useState({});
    const [locationInfo, setLocationInfo] = useState(null)

    var events = eventData.map(ev => {
        // console.log(filteredEvents.includes(ev.categories[0].title.toString()))
        if (ev.categories[0].id === 8 && filteredEvents.includes(ev.categories[0].title.toString())) {
            return <LocationMarker key={ev.id} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} type="wildfire" 
                    onClick={() => setLocationInfo({id: ev.id, title: ev.title})}    />
        } else if (ev.categories[0].id === 10 && filteredEvents.includes(ev.categories[0].title.toString())) {
            return <LocationMarker key={ev.id} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} type="storm" 
            onClick={() => setLocationInfo({id: ev.id, title: ev.title})}    />
        } else if (ev.categories[0].id === 12 && filteredEvents.includes(ev.categories[0].title.toString())) {
            if (ev.geometries[0].coordinates.length === 1) {
                ev.geometries[0].coordinates.forEach(coord => {
                    return <LocationMarker key={ev.id} lat={coord[1]} lng={coord[0]} type="volcano" 
                    onClick={() => setLocationInfo({id: ev.id, title: ev.title})}    />        
                });

            } else {
                return <LocationMarker key={ev.id} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} type="volcano" 
                onClick={() => setLocationInfo({id: ev.id, title: ev.title})}    />    
            }
        } else if (ev.categories[0].id === 16 && filteredEvents.includes(ev.categories[0].title.toString())) {
            return <LocationMarker key={ev.id} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} type="earthquake" 
            onClick={() => setLocationInfo({id: ev.id, title: ev.title})}    />
        } else if (ev.categories[0].id === 15 && filteredEvents.includes(ev.categories[0].title.toString())) {
            return <LocationMarker key={ev.id} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} type="earthquake" 
            onClick={() => setLocationInfo({id: ev.id, title: ev.title})}    />
        }
        return null;
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
            <div className="event-filter">
            <h2>Event Filter</h2>
            <CheckboxGroup className="checkbox-list" onClick={getFilteredEvents(onChange)} onChange={setOnChange} defaultChecked>
                <AllCheckerCheckbox/>
                <span>All</span>
                <br />
                <Checkbox className="tab" value="Wildfires" />
                <span>Wildfire</span>
                <br />
                <Checkbox className="tab" value="Severe Storms" />
                <span>Severe Storm</span>
                <br />
                <Checkbox className="tab" value="Volcanoes" />
                <span>Volcano</span>
                <br />
                <Checkbox className="tab" value="Earthquakes" />
                <span>Earthquake</span>
                <br />
                <Checkbox className="tab" value="Sea and Lake Ice" />
                <span>Sea and Lake Ice</span>
                <br />
            </CheckboxGroup>
            </div>
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