import React from "react"

function EventDisplay(props) {

    let selectedDate = props.dateInfo.split(" "),
    weekDay = selectedDate[0],
    month   = selectedDate[1],
    day     = selectedDate[2],
    year    = selectedDate[3]
    
    function convertedDate() {
        let m = month,
            d = day
        if(month < 10) {
          m = `0${month}`
        } else if(day < 10) {
          d = `0${day}`
        }
        return `${year}-${m}-${d}`
        }
    
    let formatedSelectedDate = convertedDate(),
        selectedDateEvent

    props.eventInfo.forEach((event) => {
        if(formatedSelectedDate === event.date) {
            selectedDateEvent = event
        }
    })

    let eventColor, eventTitle
//check for event and render content
    if(selectedDateEvent) {
        //color
        eventColor = {
            backgroundColor: selectedDateEvent.color
        }
        //title
        eventTitle = selectedDateEvent.title

    } else {
        eventColor = {
            backgroundColor: "transparent"
        }
        eventTitle = ""
    }


    return (
    <div className="event-display">
        <div className="event-title">
            <h1>{eventTitle}</h1>
            <div id="event-display-color" style={eventColor}></div>
        </div>


    </div>
    )
}

export default EventDisplay