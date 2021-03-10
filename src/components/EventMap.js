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
        if (ev.categories[0].id === 'wildfires' && filteredEvents.includes(ev.categories[0].title.toString())) {
            return <LocationMarker key={ev.id} lat={ev.geometry[0].coordinates[1]} lng={ev.geometry[0].coordinates[0]} type="wildfire" 
                    onClick={() => setLocationInfo({id: ev.id, title: ev.title, date: ev.geometry[0].date.substring(0, 10)})}    />
        } else if (ev.categories[0].id === 'severeStorms' && filteredEvents.includes(ev.categories[0].title.toString())) {
            return <LocationMarker key={ev.id} lat={ev.geometry[0].coordinates[1]} lng={ev.geometry[0].coordinates[0]} type="storm" 
            onClick={() => setLocationInfo({id: ev.id, title: ev.title, date: ev.geometry[0].date.substring(0, 10)})}    />        
        } else if (ev.categories[0].id === 'volcanoes' && filteredEvents.includes(ev.categories[0].title.toString())) {
            if (ev.geometry[0].coordinates.length === 1) {
                ev.geometry[0].coordinates.forEach(coord => {
                    return <LocationMarker key={ev.id} lat={coord[1]} lng={coord[0]} type="volcano" 
                    onClick={() => setLocationInfo({id: ev.id, title: ev.title, date: ev.geometry[0].date.substring(0, 10)})}    />        
                });

            } else {
                return <LocationMarker key={ev.id} lat={ev.geometry[0].coordinates[1]} lng={ev.geometry[0].coordinates[0]} type="volcano" 
                onClick={() => setLocationInfo({id: ev.id, title: ev.title, date: ev.geometry[0].date.substring(0, 10)})}    />    
            }
        }
        return null;
    })

    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys= {{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
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