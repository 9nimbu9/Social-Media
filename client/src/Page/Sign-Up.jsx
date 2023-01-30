import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

let userID

function SignUp(){
    const navigate = useNavigate()
    var {id} = useParams()
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [bol, setBol] = useState(false)   

    function names(event){
        setName(event.target.value)
    }
    function emails(event){
        setEmail(event.target.value)
    }
    function userNames(event){ 
        setUsername(event.target.value)
    }
    function passwords(event){
        setPassword(event.target.value)
    } 

    function click(event){
        Axios.post("http://localhost:5000/signUp", {name: name, email: email, userName: userName, password: password}).then(
            (res) => {
                console.log(res) 
                if(res.data!==404){
                    console.log(res.data)
                    setBol(true)
                    // setUserid(res.data)
                    userID = res.data
                }
            }
        )
        setUsername("")
        setPassword("")
        setEmail("")
        setUsername("")
        event.preventDefault()
    }

    useEffect(() => {
        if(bol){ 
            setBol(false)
            id = userID
            navigate("/home_"+id, {
                state: {
                    loggedIn: userID
                }
            })
        }
    })
    

    return(
        <form onSubmit={click}>
            <input type="text" value={name} onChange={names} placeholder="Name"/>
            <input type="text" value={email} onChange={emails} placeholder="Email"/>
            <input type="text" value={userName} onChange={userNames} placeholder="User Name"/>
            <input type="text" value={password} onChange={passwords} placeholder="Password"/>
            <button type="submit">Submit</button>
        </form>
    )     
}

export default SignUp