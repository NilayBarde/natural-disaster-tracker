export const LocationInfo = ({ info }) => {
    return (
        <div className="location-info">
            <h2>Event Location Info</h2>
            <ul>
                <li>ID: <strong>{ info.id }</strong></li>
                <li>Title: <strong>{ info.title }</strong></li>
                <li>Date: <strong>{ info.date }</strong></li>
            </ul>
            
        </div>
    )
}

export default LocationInfo