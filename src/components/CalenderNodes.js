import React from "react"

  function TodaysDateNode(props) {
    const nodeEventColorDot = {
      backgroundColor: props.eventInfo,
      width: 5,
      height: 5,
      borderRadius: 10
    }


    return (
      <li id={props.id} className="calender-node">
        <div className="date-text current-day">
          <div className="calender-num">{props.day}</div>
          <div className="calender-color" style={nodeEventColorDot}></div>
        </div>
      </li>
    )
  }
  
  function FirstDateNode(props) {
    const nodeEventColorDot = {
      backgroundColor: props.eventInfo,
      width: 10,
      height: 10,
      borderRadius: 10
    }
    return (
      <li id={props.id} className="calender-node">
      <div className="date-text">
        <div className="first-day">{props.month}</div>
        <div>{props.day}</div>
        <div className="first-day">{props.year}</div>
      </div>
      <div className="calender-color" style={nodeEventColorDot}></div>
    </li>
    )
  }
  
  function StandardDateNode(props) {
    const nodeEventColorDot = {
      backgroundColor: props.eventInfo,
      width: 10,
      height: 10,
      borderRadius: 10
    }

    return (
      <li id={props.id} className="calender-node">
        <div className="date-text">
          <div>{props.day}</div>
        </div>
        <div className="calender-color" style={nodeEventColorDot}></div>
    </li>
    )
  }

  function SelectedDateNode(props) {
    const nodeEventColorDot = {
      backgroundColor: props.eventInfo,
      width: 5,
      height: 5,
      borderRadius: 10
    }
    return (
      <li id={props.id} className="calender-node">
        <div className="date-text selected-date">
          <div className="calender-month">{props.month}</div>
          <div>{props.day}</div>
          </div>
          <div className="calender-color" style={nodeEventColorDot}></div>
      </li>
    )
  }

  export {StandardDateNode, FirstDateNode, TodaysDateNode, SelectedDateNode}