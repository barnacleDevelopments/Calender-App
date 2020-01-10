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
                    <label><b>DATE: </b></label>
                    <input type="date" name="event-date"/>
                </div>
                <button>ADD</button>
            </form>
        </div>
    )
}

export default CreateUserForm