import { useState, useEffect } from 'react'
import EventMap from './components/EventMap'

function App() {
  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const res = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events')
      const { events } = await res.json()
      setEventData(events)
      setLoading(false)
    }
    fetchEvents()

  }, [])

  return (
    <div>
      {!loading ? <EventMap eventData={eventData} /> : <h1>Loading</h1>}
    </div>
  );
}

export default App;
