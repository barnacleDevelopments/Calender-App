import React from 'react';
import './App.css';
import DaysOfTheWeekTab from "./conponents/static/DaysOfTheWeekTab"
import SelectedDateHead from "./conponents/static/SelectedDateHead"
import CalenderNodesWrap from "./conponents/functional/CalenderNodesWrap"
import TodaysDateButton from "./conponents/static/TodaysDateButton"
var currentDate = new Date()



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        currentDate: `${this.getWeekDay(currentDate.getDay())} ${this.getMonth(currentDate.getMonth())} ${currentDate.getDate()} ${currentDate.getFullYear()}`,

        selectedDate: `${this.getWeekDay(currentDate.getDay() + 1)} ${this.getMonth(currentDate.getMonth() + 1)} ${currentDate.getDate() + 1} ${currentDate.getFullYear() + 1}`,

        todaysDate: `${this.getWeekDay(currentDate.getDay())} ${this.getMonth(currentDate.getMonth())} ${currentDate.getDate()} ${currentDate.getFullYear()}`,

        firstDayDate: "Sun Jan 1 2019",

        currentDateLocation: Number,
        
        get pastDates() {
          let daysOfYear = [];
          for(let pastD = new Date(2019, 0, 1); pastD <= currentDate; pastD.setDate(pastD.getDate() + 1)) {
             daysOfYear.push({date: new Date(pastD)})
          }
          return daysOfYear
        },
        
        get futureDates() {
          let daysOfYear = [];
          for(let pastD = new Date(2021, 0, 1); pastD >= currentDate; pastD.setDate(pastD.getDate() - 1)) {
              daysOfYear.push({date: new Date(pastD)})
          } 
          return daysOfYear 
        },

       get allDates() {
          let future = this.futureDates.reverse(),
              past   = this.pastDates
          return past.concat(future)
       },
      }
        this.getSelectedDate = this.getSelectedDate.bind(this)
        this.scrollToCurrentDate = this.scrollToCurrentDate.bind(this)
    }

  getMonth(monthNum) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monthNum]
  }

  getWeekDay(dayNum) {
    let weekDays = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    return weekDays[dayNum]
  }

  rowsOfDates(chunk) {
    let rows = [],
    dates    = this.state.allDates
    for(let i = 0; i <= dates.length; i += chunk) {
      rows.push(dates.slice(i, i + chunk)) 
    }
    return rows
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


componentDidMount() {
  let calender = document.querySelector(".calender-interface"),
      currentDay = document.querySelector(".current-day"),
      currentDayPosition = currentDay.parentNode.offsetTop - 400
          calender.scrollTo(0, currentDayPosition)
            this.setState({
              currentDateLocation: currentDayPosition
            })
}

  scrollToCurrentDate() {
    let calender = document.querySelector(".calender-interface")
    calender.scrollTo(0, this.state.currentDateLocation)
  }

  render() {
  return (
    <div>
      <SelectedDateHead selectedDate={this.state.currentDate}/>
      <DaysOfTheWeekTab />
      <div onClick={this.scrollToCurrentDate}>
          <TodaysDateButton />
      </div>
    <div className="calender-interface" onClick={this.getSelectedDate}>
      {this.rowsOfDates(7).map((row, index) => {
        return <ul className="calender-row" key={index} >
          {row.map((day, index) => {
              let dateString = `${this.getWeekDay(day.date.getDay())} ${this.getMonth(day.date.getMonth())} ${day.date.getDate()} ${day.date.getFullYear()}`
              return <CalenderNodesWrap key={index} currentIteration={dateString} currentDateData={dateString} todaysDateData={this.state.todaysDate} selectedDateData={this.state.selectedDate}/>
          })}
        </ul>
      })}
    </div>
  </div>
  );
  }
}

export default App;
