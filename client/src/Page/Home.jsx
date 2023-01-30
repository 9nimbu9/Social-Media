import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Card from "../Components/Card"
import Search from "../Components/Search"
import Axios from "axios"
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomeInfo from "../Components/HomeInfo";


function Home(){
    const location = useLocation()
    const {id} = useParams()
    const [tweet, setTweet] = useState("")
    const [file, setFile] = useState("")
    const [user, setUser] = useState([])
    const [follow, setFollow] = useState([])
    const [storeTweet, setStoretweet] = useState([])
    const [bol, setBol] = useState(true)
    const [log, setLog] = useState(location.state.loggedIn)

    function change(event){
        setTweet(event.target.value)
    }

    function onFormSubmit(event){
        const formData = new FormData()
        formData.append('photo', file)
        formData.append('tweet', tweet)
        formData.append('userId', id)
        Axios.post("http://localhost:5000/upload", formData).then(res => {
            console.log(res.status)
            if(res.status===200){
                setBol(true)
            }
        }).catch(
            (error) => {
                console.log(error)
            }
        ) 
        setFile("")
        setTweet("")
        event.preventDefault()       
    }

    function onInputChange(event){
        setFile(event.target.files[0])
    }

    if(bol){
        Axios.get("http://localhost:5000/upload").then(
            (response) => {
                setStoretweet(response.data)
                setBol(false)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }
    useEffect(() => {
        Axios.get("http://localhost:5000/signUp").then(
            (res) => {
                setUser(res.data)
            }
        )
    },[])

    
    useEffect(() => {
        const found = user.filter(m => id===m._id)
        if(found!==[]){
            if(found[0]!==undefined){
                setFollow(found[0].followId)
            }
        }
    },[user])

    return(
        <div className="row">

            <div className="" style={{width: "15%"}}>
                {user.map(m => {
                    if(id===m._id){
                        return <HomeInfo key={id} id={id} name={m.name}/>
                    }
                })} 
            </div>

            
            <div className="tweetArea" style={{width: "50%"}}>
                <h2>Home</h2>
                <input className="tweetText" type="text" placeholder="What's Happening?" value={tweet} onChange={change}/>
                <form onSubmit={onFormSubmit}> 
                    <input type="file" name="photo" onChange={onInputChange}/>
                    <Button variant="contained" type="submit">Tweet</Button>
                </form>
                <br></br>
                {storeTweet.map((singleData, index) => {
                    if(singleData.img!==undefined){
                        const base64String = btoa(String.fromCharCode(...new Uint8Array((singleData.img.data.data))))                        
                        if(follow!==undefined){
                            return(
                                <div>
                                    {follow.map(m => {
                                        if(m===singleData.userId){
                                            {/* console.log(singleData._id) */}
                                            return <Card key={singleData._id} logged={log} person={singleData.userId} id={singleData._id} tweet={singleData.tweet} src={`data: image/png;base64,${base64String}`}/>   
                                        }
                                    })}
                                </div>
                            )
                        }
                    }else{
                         if(follow!==undefined){
                            return(
                                <div>
                                    {follow.map(m => {
                                        if(m===singleData.userId){
                                            {/* console.log(singleData._id) */}
                                            return <Card key={singleData._id} logged={log} person={singleData.userId} id={singleData._id} tweet={singleData.tweet}/>   
                                        }
                                    })}
                                </div>
                            )
                        }
                    }
                })}
            </div>


            <div className="" style={{width: "35%"}}>
                <Search userId={id}/>
            </div>


        </div>
    )
}

export default Home
