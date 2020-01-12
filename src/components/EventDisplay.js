import React from "react"

function EventDisplay(props) {

    let selectedDate = props.dateInfo.split(" "),
    weekDay = selectedDate[0],
    month   = selectedDate[1],
    day     = selectedDate[2],
    year    = selectedDate[3]
    
    function convertedDate() {
        let m = Number(month) + 1,
            d = day
        if(month < 10) {
          m = `0${Number(month) + 1}`
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

    let color, title, time
//check for event and render content
    if(selectedDateEvent) {
        //color
        color = {
            backgroundColor: selectedDateEvent.color,
            borderRadius: 10
        }
        //title
        title = selectedDateEvent.title

        //time
        time = selectedDateEvent.time
    } else {
        color = {
            backgroundColor: "transparent"
        }
        title = ""

        time = ""
    }


    return (
    <div className="event-display">
        <div className="event-title" style={color}>
            <div id="event-title">
                <h1>{title}</h1>
                <div id="event-display-color"></div>
            </div>
           
            <div id="event-details">
                 <p>{time}</p>
            </div>
        </div>


    </div>
    )
}

export default EventDisplay