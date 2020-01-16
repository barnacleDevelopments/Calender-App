import React, {useState} from "react"

function EventEditor(props) {

    const [fields, setFields] =  useState({}),
    [errors, setErrors] =  useState({})

    function handleFormSubmit(e) {
        e.preventDefault()
        let fields = {}
        if(validateFormEntries()) {
            fields["event-name"] = ""
            fields["event-color"] = ""
            fields["event-date"]  = ""
            fields["event-time"]  = ""
            
            setFields(fields)
            props.editFunction(e)
            alert("Event Edited")
        } 
    }

    function handleFieldEntries(e) {
        let field = fields
        field[e.target.name] = e.target.value
        setFields(field)
    }

    function validateFormEntries(e) {
        let validated = true,
            field     = fields,
            error     = {}

            if(!fields["event-name"]) {
                error["event-name"] = "Please enter a title."
                validated = false;
                setErrors(error)
                return validated
            } 
                if(fields["event-name"].length >= 20) {
                    error["event-name"] = "Title cannot exeed 20 charecters!"
                    validated = false;
           
                } else if(!fields["event-name"].match(/^[a-zA-Z\s]*$/)) {
                    error["event-name"] = "Title cannot include numbers!"
                    validated = false;
                } 

            if(!fields["event-date"]) {
                console.log("hello")
                error["event-date"] = "Please enter a date."
                setErrors(error)
                validated = false;
                return validated
            }

        setErrors(error)

        return validated
    }
    const colorStyle = {
        backgroundColor: props.eventDetails.color    
    }
        
    return (
        <div className="form-wrap" style={colorStyle}>
          <form onSubmit={handleFormSubmit}>
                <div>
                    <div className="title-input" >
                        <label><b>TITLE: {props.eventDetails.title}</b></label>
                        <input type="text" name="event-name" onChange={handleFieldEntries}/>
                        <p>{errors["event-name"]}</p>
                    </div>


                    <div className="color-input">
                        <label><b>COLOR: </b></label>
                        <input type="color" name="event-color" onChange={handleFieldEntries}/>
                        <p>{errors["event-color"]}</p>
                    </div>
                </div>

                <div>
                    <div className="date-input">
                        <label><b>DATE: {props.eventDetails.date} </b></label>
                        <input type="date" name="event-date" onChange={handleFieldEntries}/>
                        <p >{errors["event-date"]}</p>
                    </div>

                    <div className="time-input">
                        <label><b>TIME: {props.eventDetails.time}</b></label>
                        <input type="time" name="event-time" onChange={handleFieldEntries}/>
                        <p>{errors["event-time"]}</p>
                    </div>
                </div>
                <button>EDIT</button>   
                <button onClick={props.deleteFunction}>DELETE</button>
            </form>
        </div>
    )
}

export default EventEditor