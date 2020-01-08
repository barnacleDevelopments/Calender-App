import React from "react"

function HeaderWrap(props) {
    return (
        <div className="current-date">
            {props.children}
        </div>
    )
}

export default HeaderWrap