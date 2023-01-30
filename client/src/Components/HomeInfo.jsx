import React from "react";
import { Link } from "react-router-dom"

function HomeInfo(props){
    return(
        <div>
            <Link
                to={"/personal_"+props.id}
                state={{
                    loggedIn: props.id
                }}>{props.name}</Link> 
        </div>
    )
}

export default HomeInfo