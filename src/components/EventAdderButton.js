import React from "react"
import {Redirect} from "react-router-dom"

function EventAdderButton() {
    function displayForm() {
        return <Redirect to="/create"/>
      }
    return (
        <div>
            <button onClick={displayForm} className="event-button" >Add Event</button>
        </div>
    )
}

export default EventAdderButton