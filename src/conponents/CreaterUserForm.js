import React from "react"

function CreateUserForm(props) {
    return (
        <form onSubmit={props.getEvent}>
            <input type="text" name="event-name"/>
            <button>ADD EVENT</button>
        </form>
    )
}

export default CreateUserForm