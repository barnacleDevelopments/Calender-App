import React, {useState} from "react"

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
            props.createFunction(e)
            alert("Event Created")
        } 
    }

    function handleFieldEntries(e) {
        let field = fields
        field[e.target.name] = e.target.value
        setFields(field)
    }

    function validateFormEntries() {
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
                validated = false;
                setErrors(error)
                return validated
            }

        setErrors(error)

        return validated
    }

    return (
        <div  className="form-wrap">
            <form onSubmit={handleFormSubmit}>
                <div>
                    <div className="title-input">
                        <label><b>TITLE: </b></label>
                        <input type="text" name="event-name" onChange={handleFieldEntries}/>
                        <p className="validation-message">{errors["event-name"]}</p>
                    </div>

                    <div className="color-input">
                        <label><b>COLOR: </b></label>
                        <input type="color" name="event-color" onChange={handleFieldEntries}/>
                        <p className="validation-message">{errors["event-color"]}</p>
                    </div>
                </div>

                <div>
                    <div className="date-input">
                        <label><b>DATE: </b></label>
                        <input type="date" name="event-date" onChange={handleFieldEntries}/>
                        <p className="validation-message">{errors["event-date"]}</p>
                    </div>

                    <div className="time-input">
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