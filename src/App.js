import React, {useState, useEffect} from "react"
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

//header items 
import SelectedDateHead  from "./conponents/SelectedDateHead"
import EventDisplay      from "./conponents/EventDisplay"

//calender body info
import CalenderNodesWrap from "./conponents/CalenderNodesWrap"

//buttons
import TodaysDateButton  from "./conponents/TodaysDateButton"
import EventAdderButton  from "./conponents/EventAdderButton"

//event creation form
import CreateUserForm    from "./conponents/CreaterUserForm"

//component wraps
import HeaderWrap        from "./conponents/HeaderWrap"
import BodyWrap          from "./conponents/BodyWrap"

import DaysOfTheWeekTab  from "./conponents/DaysOfTheWeekTab"


//current date
var currentDate = new Date()

  function App()  {
      const [currentDateLocation, setCurrentDateLocation] = useState(Number),
            [day, setCurrentDate]                         = useState(`${getWeekDay(currentDate.getDay())} ${getMonth(currentDate.getMonth())} ${currentDate.getDate()} ${currentDate.getFullYear()}`),
            [selectedDate, setSelectedDate]               = useState(`${getWeekDay(currentDate.getDay() + 1)} ${getMonth(currentDate.getMonth() + 1)} ${currentDate.getDate() + 1} ${currentDate.getFullYear() + 1}`),
            [todaysDate, setTodaysDate]                   = useState(`${getWeekDay(currentDate.getDay())} ${getMonth(currentDate.getMonth())} ${currentDate.getDate()} ${currentDate.getFullYear()}`),
            [firstDayDate, setfirstDayDate]               = useState("Sun Jan 1 2019"),
            [holidays, setHolidays]                       = useState("")
  
    useEffect(()=> {
      getTodaysScrollPosition()
    })

//   const getHolidays = async () => {
//     const data = await fetch("./api/holidays.json")
// console.log(data)
//     const holidays = await data.json()

//     setHolidays(holidays)
//   }

  function getTodaysScrollPosition() {
      // get current date scroll location
    let calender = document.querySelector(".calender-interface"),
    currentDay = document.querySelector(".current-day"),
    currentDayPosition = currentDay.parentNode.offsetTop - 400
        calender.scrollTo(0, currentDayPosition)
          setCurrentDateLocation(currentDayPosition)
  }

  function scrollToTodaysDate() {
    //scroll to todays date
    let calender = document.querySelector(".calender-interface")
    calender.scrollTo(0, currentDateLocation)
  }

  function allDates() {
    //get all dates 
    let pastDates = [];
    let futureDates = [];
      for(let pastD = new Date(2019, 0, 1); pastD <= currentDate; pastD.setDate(pastD.getDate() + 1)) {
        pastDates.push({date: new Date(pastD)})
      }

      for(let futureD = new Date(2021, 0, 1); futureD >= currentDate; futureD.setDate(futureD.getDate() - 1)) {
        futureDates.push({date: new Date(futureD)})
        } 
        return pastDates.concat(futureDates.reverse())
      }

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
    
  function rowsOfDates(chunk) {
    //make rows of dates
    let rows = [],
    dates    = allDates()
    for(let i = 0; i <= dates.length; i += chunk) {
      rows.push(dates.slice(i, i + chunk)) 
    }
    return rows
 }

  function getSelectedDate(e) {
    //get selected date and change state
    if(e.target.parentNode.className === "calender-row") {
      setSelectedDate(e.target.getAttribute("id"))
      setCurrentDate(e.target.getAttribute("id"))

    } else if(e.target.parentNode.className === "calender-node") {
        setSelectedDate(e.target.parentNode.getAttribute("id"))
        setCurrentDate(e.target.parentNode.getAttribute("id"))

    } else if(e.target.parentNode.className === "date-text" || "current-day") {
        setSelectedDate(e.target.parentNode.parentNode.getAttribute("id"))
        setCurrentDate(e.target.parentNode.parentNode.getAttribute("id"))
    }
  }

    function createEvent(e) {
      e.preventDefault()
        console.log(e.target.elements["event-name"].value)
    }

  return (
      <div className="wrapper">
        <HeaderWrap>
          <SelectedDateHead selectedDate={day}/>           
          <EventDisplay />
        </HeaderWrap>
        
        <BodyWrap>
          <DaysOfTheWeekTab />
          <div onClick={scrollToTodaysDate}>
            <TodaysDateButton />
          </div>

          <div className="calender-interface" onClick={getSelectedDate}>
            {rowsOfDates(7).map((row, index) => {
              return <ul className="calender-row" key={index}>
                {row.map((day, index) => {
                    let dateString = `${getWeekDay(day.date.getDay())} ${getMonth(day.date.getMonth())} ${day.date.getDate()} ${day.date.getFullYear()}`
                    return <CalenderNodesWrap key={index} currentIteration={dateString} currentDateData={dateString} todaysDateData={todaysDate} selectedDateData={selectedDate}/>
                })}
              </ul>
            })}
          </div>
        </BodyWrap>

      <div className="event-adder-wrapper">
          <EventAdderButton />
          <CreateUserForm getEvent={createEvent} />
      </div>
    </div>
  );
}

export default App;
