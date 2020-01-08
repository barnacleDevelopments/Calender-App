import React from "react"

function CreateUserForm(props) {
    return (
        <div  className="form-wrap">
            <form onSubmit={props.createEvent}>
                <div>
                    <label><b>TITLE: </b></label>
                    <input type="text" name="event-name"/>
                </div>

                <div>
                    <label><b>COLOR: </b></label>
                    <input type="color" name="event-color"/>
                </div>

                <div>
                    <label><b>TIME: </b></label>
                    <input type="time" name="event-time"/>
                </div>
                <button>ADD</button>
            </form>
        </div>
    )
}

export default CreateUserForm