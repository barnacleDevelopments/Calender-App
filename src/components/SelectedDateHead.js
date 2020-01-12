import React from "react"

function SelectedDateHead(props) {

  function getMonth(monthNum) {
    //get short month versions
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monthNum]
  }

  function getWeekDay(dayNum) {
    //get days of the week
    let weekDays = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    return weekDays[dayNum]
  }

  if(props.selectedDate !== "root" && props.selectedDate !== null) {
    let date    = props.selectedDate.split(" "),
        weekDayNum = date[0],
        month   = date[1],
        day     = date[2],
        year    = date[3]

      return (
        <div className="date-wrapper">
          <div className="date-info">{year}</div>
          <div className="date-info">{`${getWeekDay(weekDayNum)}, ${getMonth(month)} ${day}th`}</div>
        </div>
      )
    } else {
      return <div></div>
    }
  }

export default SelectedDateHead