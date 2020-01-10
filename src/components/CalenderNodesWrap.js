import React from "react"
import {TodaysDateNode, FirstDateNode, StandardDateNode, SelectedDateNode} from "./CalenderNodes"

function CalenderNodesWrap(props) {

  function getMonth(monthNum) {
    //get short month versions
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monthNum]
  }

  //get date info
  let currentDateIteration = props.currentDateIteration.split(" "),
          weekDay = currentDateIteration[0],
          month   = currentDateIteration[1],
          day     = currentDateIteration[2],
          year    = currentDateIteration[3]

  let firstDay = day === "1" ? day : 0

  let firstDayMonth = `${weekDay} ${month} ${firstDay} ${year}`

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

  //get event info
  let events = props.eventInfo

  let d = convertedDate()

  let currentDateEvent

  console.log(events[0].date)

  events.forEach((event) => {
      if(event.date === d) {
          currentDateEvent = event.color
      }
  });

  let component
  switch(props.currentDateIteration) {
    case props.selectedDateData: 
    component =  <SelectedDateNode id={props.selectedDateData} month={getMonth(month)} day={day} eventInfo={currentDateEvent} /> 
    break;

    case  props.todaysDateData:
    component =  <TodaysDateNode id={props.todaysDateData} month={getMonth(month)} day={day} eventInfo={currentDateEvent} />
    break;

    case firstDayMonth:
    component = <FirstDateNode id={props.currentDateData} month={getMonth(month)} day={day} year={year} eventInfo={currentDateEvent} />
      break;

    default:
    component = <StandardDateNode id={props.currentDateData} month={getMonth(month)} day={day} eventInfo={currentDateEvent} /> 
    break;
  }

  return component

}
    



export default CalenderNodesWrap