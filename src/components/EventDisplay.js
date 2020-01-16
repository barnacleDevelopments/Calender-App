import React from "react"

function EventDisplay(props) {
let selectedDate
if(props.dateInfo){
    selectedDate = props.dateInfo.split(" ")
} else {
    selectedDate = props.todaysDate.split(" ")
}
    
    let month   = selectedDate[1],
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

//check for event and render content
let color, title, time, id, disapear

    if(selectedDateEvent) {
        //color
        color = {
            backgroundColor: selectedDateEvent.color
        }

        disapear = {}
        //title
        title = selectedDateEvent.title

        //time
        time = selectedDateEvent.time

        id   = selectedDateEvent._id


    } else {
        disapear = {
            display: "none"
        }

        color = {
            backgroundColor: "transparent"
        }
        title = ""

        time = ""

        id   = ""
    }

    function passEventDetailsToEditForm() {
        props.setCurrentForm(false)
        props.setEventDetails(selectedDateEvent)
    }

    return (
        <div className="event-display" style={color}>
                <div id="event-details">
                    <div>
                         <h1>{title}</h1>
                        <h2>{time}</h2>
                    </div>
                       
                    <div style={disapear} id="event-btns">
                        <button onClick={passEventDetailsToEditForm}>EDIT</button>
                    </div>
                </div>

                <div id="event-notes">
                    <p></p>
                </div>
            </div>
    )
}

export default EventDisplay