import React from "react"
import CreateUserForm from "./EventCreaterForm"
import EventEditor    from "./EventEditerForm"

function Forms(props) { 

  let currentComponent

    if(props.currentForm){
      currentComponent = <CreateUserForm createFunction={props.createFunction} />
    } else {
      currentComponent = <EventEditor editFunction={props.editFunction} eventDetails={props.eventDetails} setCurrentForm={props.setCurrentForm} deleteFunction={props.deleteFunction}/>
    }

    return (
        <div>
            {currentComponent}
        </div>
    )
}

export default Forms