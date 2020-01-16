import React from "react"

function BodyWrap(props) {
    return (
        <div className="body-wrap">
            {props.children}
        </div>
    )
}

export default BodyWrap