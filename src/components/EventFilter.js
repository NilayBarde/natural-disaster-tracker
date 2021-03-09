import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';
import { useState } from 'react'

export const EventFilter = () => {
    const [onChange, setOnChange] = useState({});
    return (
        <div className="event-filter">
            <h2>Event Filter</h2>
            <CheckboxGroup onChange={setOnChange} defaultChecked>
                <AllCheckerCheckbox/>
                <span>All</span>
                <br />
                <Checkbox className="tab" value="Wildfire" />
                <span>Wildfire</span>
                <br />
                <Checkbox className="tab" value="Storm" />
                <span>Severe Storm</span>
                <br />
                <Checkbox className="tab" value="Volcano" />
                <span>Volcano</span>
                <br />
            </CheckboxGroup>
            {/* <li>
                <pre>{JSON.stringify(onChange, null, 2)}</pre>
            </li>        */}

        </div>
    )
}

export default EventFilter