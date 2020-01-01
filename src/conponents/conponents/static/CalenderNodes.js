import React from "react"

  function TodaysDateNode(props) {
    return (
      <li id={props.id} className="calender-node">
        <div className="date-text current-day">
          <div className="calender-num">{props.day}</div>
        </div>
      </li>
    )
  }
  
  function FirstDateNode(props) {
    return (
      <li id={props.id} className="calender-node">
      <div className="date-text">
        <div className="first-day">{props.month}</div>
        <div className="calender-num">{props.day}</div>
        <div className="first-day">{props.year}</div>
      </div>
    </li>
    )
  }
  
  function StandardDateNode(props) {
    return (
      <li id={props.id} className="calender-node">
        <div className="date-text">
          <div className="calender-num">{props.day}</div>
        </div>
    </li>
    )
  }

  function SelectedDateNode(props) {
    return (
      <li id={props.id} className="calender-node">
        <div className="date-text selected-date">
          <div className="calender-month">{props.month}</div>
          <div className="calender-num">{props.day}</div>
          </div>
      </li>
    )
  }

  export {StandardDateNode, FirstDateNode, TodaysDateNode, SelectedDateNode}