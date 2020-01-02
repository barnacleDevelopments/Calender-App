import React from "react"

function DateDisplay(props) {
  if(props.selectedDate !== "root" && props.selectedDate !== null) {
    let date    = props.selectedDate.split(" "),
        weekDay = date[0],
        month   = date[1],
        day     = date[2],
        year    = date[3]

      return (
        <div className="date-wrapper">
          <div className="date-info">{year}</div>
          <div className="date-info">{`${weekDay}, ${month} ${day}th`}</div>
        </div>
      )
    } else {
      return <div></div>
    }
  }

export default DateDisplay