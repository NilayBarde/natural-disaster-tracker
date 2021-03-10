import {Icon} from '@iconify/react'
import fireIcon from '@iconify/icons-mdi/fire-alert'
import stormIcon from '@iconify/icons-mdi/weather-lightning-rainy'
import volcanoIcon from '@iconify-icons/wi/volcano'
import earthquakeIcon from '@iconify-icons/wi/earthquake'

const LocationMarker = ({ lat, lng, type, onClick}) => {
    var locationIcon
    if (type === "wildfire") {
        locationIcon = fireIcon
    } else if (type === "storm") {
        locationIcon = stormIcon
    } else if (type === "volcano") {
        locationIcon = volcanoIcon
    } else if (type === "earthquake") {
        locationIcon = earthquakeIcon
    }
    return (
        <div onClick={onClick}>
            <Icon icon={locationIcon} className={type} />
        </div>
    )
}

export default LocationMarker
