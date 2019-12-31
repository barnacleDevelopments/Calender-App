import React from "react"
import {TodaysDateNode, FirstDateNode, StandardDateNode, SelectedDateNode} from "../static/CalenderNodes"

function CalenderNodesWrap(props) {
  let currentIteration = props.currentIteration.split(" "),
          weekDay = currentIteration[0],
          month   = currentIteration[1],
          day     = currentIteration[2],
          year    = currentIteration[3]

  let firstDay = day === "1" ? day : 0

  let firstDayMonth = `${weekDay} ${month} ${firstDay} ${year}`

  switch(props.currentIteration) {
    case props.selectedDateData: 
    return  <SelectedDateNode id={props.selectedDateData} month={month} day={day} /> 
    break 

    case  props.todaysDateData:
      return  <TodaysDateNode id={props.todaysDateData} month={month} day={day} />
    break;

    case firstDayMonth:
      return <FirstDateNode id={props.currentDateData} month={month} day={day} year={year} />
      break

    default:
      return  <StandardDateNode id={props.currentDateData} month={month} day={day} /> 
    break
  }

}
    



export default CalenderNodesWrap