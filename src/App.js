import React, {useState, useEffect} from "react"
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import axios from "axios"

//header items 
import SelectedDateHead  from "./components/SelectedDateHead"
import EventDisplay      from "./components/EventDisplay"

//calender body info
import CalenderNodesWrap from "./components/CalenderNodesWrap"

//buttons
import TodaysDateButton  from "./components/TodaysDateButton"
import EventAdderButton  from "./components/EventAdderButton"

//event creation form
import CreateUserForm    from "./components/CreaterUserForm"

//component wraps
import HeaderWrap        from "./components/HeaderWrap"
import BodyWrap          from "./components/BodyWrap"

import DaysOfTheWeekTab  from "./components/DaysOfTheWeekTab"


//current date
var currentDate = new Date()

  function App()  {
            //date states
      const [currentDateLocation, setCurrentDateLocation] = useState(Number),
            [day, setCurrentDate]                         = useState(`${currentDate.getDay()} ${currentDate.getMonth()} ${currentDate.getDate()} ${currentDate.getFullYear()}`),
            [selectedDate, setSelectedDate]               = useState(`${currentDate.getDay() + 1} ${currentDate.getMonth() + 1} ${currentDate.getDate() + 1} ${currentDate.getFullYear() + 1}`),
            [todaysDate]                                  = useState(`${currentDate.getDay()} ${currentDate.getMonth()} ${currentDate.getDate()} ${currentDate.getFullYear()}`),
            //calender event states 
            [title, setEventTitle]                        = useState(``),
            [color, setEventColor]                        = useState(``),
            [date, setEventDate]                          = useState(``),
            [listOfEvents, setEventList]                  = useState([]),
            [selectedEvent, setSelectedEvent]             = useState()

  
    useEffect(()=> {
      getTodaysScrollPosition()
      scrollToTodaysDate()
    }, [currentDateLocation])

    useEffect(()=> {
      getEvents()
    }, [])

    

  function getTodaysScrollPosition() {
      // get current date scroll location
    let currentDay = document.querySelector(".current-day")
    if(currentDay !== null) {
        let currentDayPosition = currentDay.parentNode.offsetTop - 400
          setCurrentDateLocation(currentDayPosition)
    }

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

    
  function rowsOfDates(chunk) {
    //make rows of dates
    let rows = [],
    dates    = allDates()
    for(let i = 0; i <= dates.length; i += chunk) {
      rows.push(dates.slice(i, i + chunk)) 
    }
    return rows
 }

  function getSelectedDateInfo(e) {
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

    function getEvents() {
      axios.get("http://localhost:5000/event")
      .then((res) => {
        setEventList(res.data)
        console.log(res.data)
      }).catch((error) => {
        console.log(error)
      })
    }

    function getEvent(eventId) {
      axios.get(`http://localhost:5000/event/:id`)
      .then((res) => {
        setSelectedEvent(res.data)
      }).catch((error) => {
        console.log(error)
      })
    }

    function createEvent(e) {
      //create new evemt 
      e.preventDefault()
      setEventTitle(e.target.elements["event-name"].value)
      setEventColor(e.target.elements["event-color"].value)
      setEventDate(e.target.elements["event-date"].value)
      
      const event = {
        title: e.target.elements["event-name"].value,
        color: e.target.elements["event-color"].value,
        date: e.target.elements["event-date"].value
      }
  
      axios.post('http://localhost:5000/event/create', event)
        .then((res) => {
          console.log(res)
          getEvents()
      }).catch((error) => {
          console.log(error)
        })
      }

  return (
        <Router>
          <div className="main-calender">
            <HeaderWrap>
              <SelectedDateHead selectedDate={day}/> 
              <Switch>
                <Route path="/event" 
                render={(routeProps) => (<EventDisplay {...routeProps} dateInfo={selectedDate} eventInfo={listOfEvents}/>)}/>
              </Switch>
            </HeaderWrap>

          <BodyWrap>
            <DaysOfTheWeekTab />
            <div onClick={scrollToTodaysDate}>
              <TodaysDateButton />
            </div>
              <div className="calender-interface" onClick={getSelectedDateInfo}>
                {rowsOfDates(7).map((row, index) => {
                  return <ul className="calender-row" key={index}>
                    {row.map((day, index) => {
                        let dateString = `${day.date.getDay()} ${day.date.getMonth()} ${day.date.getDate()} ${day.date.getFullYear()}`
                        return <CalenderNodesWrap key={index} eventInfo={listOfEvents} currentDateIteration={dateString} currentDateData={dateString} todaysDateData={todaysDate} selectedDateData={selectedDate}/>
                    })}
                
                  </ul>
                })}
              </div>
          </BodyWrap>

        <div className="event-adder-wrapper">
            <EventAdderButton/>
              <Switch>
                <Route path="/event/create"
                render={(routeProps) => (<CreateUserForm {...routeProps} createEvent={createEvent} />)} />
              </Switch>
              
        </div>
      </div>

      <div className="events-display">
          <Switch>
             <Route />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
