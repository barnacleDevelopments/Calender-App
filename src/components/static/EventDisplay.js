import React from "react"

function EventDisplay(props) {
    return (
      <div className="event-display">
        <h3>{props.eventData}</h3>
        <div id="event-details">
  
        </div>
      </div>
    )
  }

export default EventDisplay