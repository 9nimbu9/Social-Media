import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Main(){
    return(
        <div>
            <Link to={"/Sign-In"}>
                <button>Sign In</button>            
            </Link>
            <Link to={"/Sign-Up"}>
                <button>Sign Up</button>            
            </Link>
        </div> 
    )
}

export default Main