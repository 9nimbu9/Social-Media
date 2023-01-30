import React, { useState } from "react";
import Button from '@mui/material/Button';
import Card from "../Components/Card"
import Search from "../Components/Search"
import Axios from "axios"
import { useParams } from "react-router-dom";

function Personal(){
    const {id} = useParams()
    const [tweet, setTweet] = useState("")
    const [file, setFile] = useState("")
    const [storeTweet, setStoretweet] = useState([])
    const [bol, setBol] = useState(true)

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
 
    return(
        <>
            <Search userId={id}/>
            {storeTweet.map(singleData => {
                if(singleData.img!=undefined){
                    const base64String = btoa(String.fromCharCode(...new Uint8Array((singleData.img.data.data))))
                    if(id===singleData.userId){
                        return <Card key={singleData._id} user={singleData.userId} id={singleData._id} tweet={singleData.tweet} src={`data: image/png;base64,${base64String}`}/>   
                    }
                }else{
                    if(id==singleData.userId){
                        return <Card key={singleData._id} user={singleData.userId} id={singleData._id} tweet={singleData.tweet}/>
                    }
                }
            })}
        </>
    )
}

export default Personal