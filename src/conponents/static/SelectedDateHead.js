import React from "react"

function SelectedDateHead(props) {
    let date     = props.selectedDate.split(" "),
        weekDay    = date[0],
        month      = date[1],
        day     = date[2],
        year  = date[3]
      return (
        <div className="current-date">
          <div>{year}</div>
          <div>{`${weekDay}, ${month} ${day}th`}</div>
        </div>
      )
    }

export default SelectedDateHead