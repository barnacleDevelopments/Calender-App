import React from "react"
import {TodaysDateNode, FirstDateNode, StandardDateNode, SelectedDateNode} from "./CalenderNodes"

function CalenderNodesWrap(props) {

  let currentIteration = props.currentIteration.split(" "),
          weekDay = currentIteration[0],
          month   = currentIteration[1],
          day     = currentIteration[2],
          year    = currentIteration[3]

  let firstDay = day === "1" ? day : 0

  let firstDayMonth = `${weekDay} ${month} ${firstDay} ${year}`

  let component

  switch(props.currentIteration) {
    case props.selectedDateData: 
    component =  <SelectedDateNode id={props.selectedDateData} month={month} day={day} /> 
    break;

    case  props.todaysDateData:
    component =  <TodaysDateNode id={props.todaysDateData} month={month} day={day} />
    break;

    case firstDayMonth:
    component = <FirstDateNode id={props.currentDateData} month={month} day={day} year={year} />
      break;

    default:
    component = <StandardDateNode id={props.currentDateData} month={month} day={day} /> 
    break;
  }

  return component

}
    



export default CalenderNodesWrap