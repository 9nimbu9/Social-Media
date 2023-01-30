// Not used Yet
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function PersonalCard(props){
    const location = useLocation()
    const {id} = useParams()
    const [totalUser, setTotalusers] = useState([])
    const [name, setName] = useState("")
    
    function deleteTweet(event){
        // event.preventDefault()
        console.log(props.id)
        Axios.post("http://localhost:5000/delete", {"delete": props.id}).then(
            (response) => {
                console.log(response.status)
                if(response.status===200){
                    console.log(props.id)
                }
            }
        )
    }
    
    useEffect(() => {
        Axios.get("http://localhost:5000/signUp").then(
            (res) => {
                setTotalusers(res.data)
            }
        )
    },[])

    useEffect(() => {
        totalUser.map(m => {
            if(props.person===m._id){
                setName(m.name)
            }
        })
    },[totalUser])
    
    console.log(id)

    return(
        <form className="tweetArea">
            <div className="row">

                <div className="pfpArea" style={{width:"10%"}}>
                    <img className="userIcon" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"/>
                </div>

                <div className="tweetContent">
                    {/* <h2>{personal}</h2> */}
                    <a href={"/personal_"+props.person}><b>{name}</b></a> 
                    <a href={"/personal_"+props.person} className="userNameTag"> @{userName}</a>
                    <p>{props.tweet}</p>
                    <img className="tweetImage" src={props.src} alt=""/>
                    {/* {likes!==[]?likes.map(m => <span key={m._id}>{m._id===props.id?m.count:""}</span>):""} */}
                    <button onClick={like} id={props.id}>Like</button>
                </div>

            </div>
            {/* <Button type="submit" variant="outlined" startIcon={<DeleteIcon/>}>Delete</Button>   */}
        </form>
        
    )
}

export default PersonalCard