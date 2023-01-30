import React, { useEffect, useState } from "react";
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom";

let userID

function SignIn(){
    const navigate = useNavigate()
    var {id} = useParams()
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [bol, setBol] = useState(false)

    function userNames(event){ 
        setUsername(event.target.value)
    }
    function passwords(event){
        setPassword(event.target.value)
    }

    function click(event){
        Axios.post("http://localhost:5000/signIn", {userName: userName, password: password}).then(
            (res) => {
                console.log(res.data)
                if(res.data!==404){
                    setBol(true)
                    userID = res.data 
                }
            }
        )
        setUsername("") 
        setPassword("")
        event.preventDefault()
    }
    useEffect(() => {
        if(bol){ 
            setBol(false)
            id=userID
            navigate("/home_"+id, {
                state: {
                    loggedIn: userID
                }
            })
        } 
    })

    return(
        <form onSubmit={click}>
            <input type="text" value={userName} onChange={userNames} placeholder="User Name"/>
            <input type="text" value={password} onChange={passwords} placeholder="Password"/>
            <button type="submit">Submit</button>
        </form>
    )    
}

export default SignIn