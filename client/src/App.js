import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from "./Page/Main"
import Home from "./Page/Home";
import Personal from "./Page/Personal";
import SignIn from "./Page/Sign-In";
import SignUp from "./Page/Sign-Up";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Main/>}/>
                <Route exact path="/home_:id" element={<Home/>}/> 
                <Route exact path="/Sign-In" element={<SignIn/>}/>
                <Route exact path="/Sign-Up" element={<SignUp/>}/>
                <Route exact path="/personal_:id" element={<Personal/>}/>
            </Routes>
        </BrowserRouter>
    ) 
}

export default App