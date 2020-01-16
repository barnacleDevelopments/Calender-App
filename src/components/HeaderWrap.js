import React from "react"

function HeaderWrap(props) {
    return (
        <div className="header">
            {props.children}
        </div>
    )
}

export default HeaderWrap