import React, {useState, useEffect} from "react"

function CreateUserForm(props) {
    const [fields, setFields] =  useState({}),
          [errors, setErrors] =  useState({})

    const todaysDate = new Date()
    const date = `${todaysDate.getFullYear()}-${todaysDate.getMonth() + 1}-${todaysDate.getDate()}`


    function handleFormSubmit(e) {
        e.preventDefault()
        let fields = {}
        if(validateFormEntries()) {
            fields["event-name"] = ""
            fields["event-color"] = ""
            fields["event-date"]  = ""
            fields["event-time"]  = ""
            
            setFields(fields)
            props.createEvent(e)
            alert("Event Created")
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
        } 
            if(fields["event-name"].length >= 20) {
                error["event-name"] = "Title cannot exeed 20 charecters!"
                validated = false;
       
            } else if(!fields["event-name"].match(/^[a-zA-Z]*$/)) {
                error["event-name"] = "Title cannot include numbers!"
                validated = false;
            } 

        setErrors(error)

        return validated
    }

    return (
        <div  className="form-wrap">
            <form onSubmit={handleFormSubmit}>
                <div>
                    <div>
                        <label><b>TITLE: </b></label>
                        <div>
                            <input type="text" name="event-name" onChange={handleFieldEntries}/>
                            <p className="validation-message">{errors["event-name"]}</p>
                        </div>
                    </div>

                    <div>
                        <label><b>COLOR: </b></label>
                        <input type="color" name="event-color" onChange={handleFieldEntries}/>
                        <p className="validation-message">{errors["event-color"]}</p>
                    </div>
                </div>

                <div>
                    <div>
                        <label><b>DATE: </b></label>
                        <input type="date" name="event-date" onChange={handleFieldEntries}/>
                        <p className="validation-message">{errors["event-date"]}</p>
                    </div>

                    <div>
                        <label><b>TIME: </b></label>
                        <input type="time" name="event-time" onChange={handleFieldEntries}/>
                        <p className="validation-message">{errors["event-time"]}</p>
                    </div>
                </div>
                <button>ADD</button>
            </form>
        </div>
    )
}

export default CreateUserForm