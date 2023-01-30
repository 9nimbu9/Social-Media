import React, { useEffect, useState } from "react";
import Axios from "axios";

function Search(props){
    const [name, setName] = useState("")
    const [stored, setStored] = useState([])
    const [find, setFind] = useState([])
    
    function change(event){
        setName(event.target.value)
    }
    function click(){
        Axios.get("http://localhost:5000/signUp").then(
            (res) => {
                setStored(res.data)                
            }
        )
        setFind(stored.filter(m => m.name===name))
    }

    // useEffect(() => {
    //     setFind(stored.filter(m => m.name===name))
    // },[name])
    
    function follow(event){
        Axios.post("http://localhost:5000/followUpdate",{followId: event.target.id, userId: props.userId})
    }

    return(
        <div>
            <input value={name} onChange={change} type="text" placeholder="Search"/>
            {find.map(m => <p key={m._id}>Found Search: <a href={"/personal_"+m._id}>{m.name}</a>
                <button id={m._id} onClick={follow}>Follow</button></p>)}
            <button onClick={click}>Submit</button>
        </div>
    )
}

export default Search