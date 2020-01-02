import React from 'react';
import './App.css';
import DaysOfTheWeekTab from "./components/static/DaysOfTheWeekTab"
import DateDisplay from "./components/static/DateDisplay"
import CalenderNodesWrap from "./components/functional/CalenderNodesWrap"
import TodaysDateButton from "./components/static/TodaysDateButton"
import EventAdderButton from "./components/functional/EventAdderButton"
import EventDisplay from "./components/static/EventDisplay"

var currentDate = new Date()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.dateNodes = React.createRef()
    this.state = {

        currentDate: `${this.getWeekDay(currentDate.getDay())} ${this.getMonth(currentDate.getMonth())} ${currentDate.getDate()} ${currentDate.getFullYear()}`,

        selectedDate: `${this.getWeekDay(currentDate.getDay() + 1)} ${this.getMonth(currentDate.getMonth() + 1)} ${currentDate.getDate() + 1} ${currentDate.getFullYear() + 1}`,

        todaysDate: `${this.getWeekDay(currentDate.getDay())} ${this.getMonth(currentDate.getMonth())} ${currentDate.getDate()} ${currentDate.getFullYear()}`,

        currentDateLocation: Number,

        response: " ",

        post: " ",
  
        responseToPost: " "

      }
        this.getSelectedDate     = this.getSelectedDate.bind(this)
        this.scrollToCurrentDate = this.scrollToCurrentDate.bind(this)
    }

  componentDidMount() {
    // get current date scroll location
      let calender = document.querySelector(".calender-interface"),
      currentDay = document.querySelector(".current-day"),
      currentDayPosition = currentDay.parentNode.offsetTop - 340
          calender.scrollTo(0, currentDayPosition)
            this.setState({
              currentDateLocation: currentDayPosition
            })
  }

  
  allDates() {
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

  rowsOfDates() {
    let rows = [],
    dates    = this.allDates()
    for(let i = 0; i <= dates.length; i += 7) {
      rows.push(dates.slice(i, i + 7)) 
    }
    return rows
  }

  getMonth(monthNum) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monthNum]
  }

  getWeekDay(dayNum) {
    let weekDays = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    return weekDays[dayNum]
  }

 getSelectedDate(e) {
   if(e.target.parentNode.className === "calender-row") {
      this.setState({
        selectedDate: e.target.getAttribute("id"),
        currentDate: e.target.getAttribute("id")
      })
   } else if(e.target.parentNode.className === "calender-node") {
    this.setState({
      selectedDate: e.target.parentNode.getAttribute("id"),
      currentDate: e.target.parentNode.getAttribute("id")
    })
   } else if(e.target.parentNode.className === "date-text" || "current-day") {
    this.setState({
      selectedDate: e.target.parentNode.parentNode.getAttribute("id"),
      currentDate: e.target.parentNode.parentNode.getAttribute("id")
    })
   }
  }

  scrollToCurrentDate() {
    let calender = document.querySelector(".calender-interface")
    calender.scrollTo(0, this.state.currentDateLocation)
  }

  componentDidMount() {
    this.callApi()
    .then(res => this.setState({response: res.express}))
    .catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch("/api/hello")
    const body = await response.json()
    if(response.status !== 200) throw Error(body.message)
    return body;
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({post: this.state.post})
    });
    console.log(response)
    const body = await response.text();
    this.setState({responseToPost: body})
  }

  render() {
  return (
    <div className="wrapper">
      <div className="current-date">
        <DateDisplay selectedDate={this.state.currentDate}/>
        <EventDisplay eventData={this.state.responseToPost}/>
      </div>
      <DaysOfTheWeekTab />
      <div onClick={this.scrollToCurrentDate}>
        <TodaysDateButton />
      </div>
    <div className="calender-interface" onClick={this.getSelectedDate} ref={this.dateNodes}>
      {this.rowsOfDates(7).map((row, index) => {
        return <ul className="calender-row" key={index} onClick={this.animateHead} >
          {row.map((day, index) => {
              let dateString = `${this.getWeekDay(day.date.getDay())} ${this.getMonth(day.date.getMonth())} ${day.date.getDate()} ${day.date.getFullYear()}`
              return <CalenderNodesWrap key={index} currentIteration={dateString} currentDateData={dateString} todaysDateData={this.state.todaysDate} selectedDateData={this.state.selectedDate}/>
          })}
        </ul>
      })}
    </div>
    <div className="event-adder-wrapper">
        <EventAdderButton />
      <div className="form-wrapper">
        <form onSubmit={this.handleSubmit}>
            <div>
            <p>Event Name: </p>
            <input type="text" value={this.state.post} onChange={(e) => {
              this.setState({post: e.target.value})}
              }></input>
            <button type="submit">submit</button>
            </div>
          <div>
              <p>Color: </p>
              <input type="color"></input>
          </div>
          </form>
        <p>{this.state.response}</p>
        <p>{this.state.responseToPost}</p>
    </div>
    </div>
  </div>
  );
  }
}

export default App;
