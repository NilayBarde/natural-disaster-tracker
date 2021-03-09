import {Icon} from '@iconify/react'
import fireIcon from '@iconify/icons-mdi/fire-alert'
import stormIcon from '@iconify/icons-mdi/weather-lightning-rainy'
import volcanoIcon from '@iconify-icons/wi/volcano'

const LocationMarker = ({ lat, lng, type, onClick}) => {
    var locationIcon
    if (type === "wildfire") {
        locationIcon = fireIcon
    } else if (type === "storm") {
        locationIcon = stormIcon
    } else if (type === "volcano") {
        locationIcon = volcanoIcon
    }
    return (
        <div className="location-marker" onClick={onClick}>
            <Icon icon={locationIcon} className="location-icon" />
        </div>
    )
}

export default LocationMarker
