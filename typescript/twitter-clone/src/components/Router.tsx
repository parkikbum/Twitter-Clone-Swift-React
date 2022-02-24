import { profile } from "console";
import React, { useState } from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

interface logged {
    isLoggedIn: any;
    userObj: any;
}

const AppRouter = ({isLoggedIn, userObj}: logged) => {
    return(
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                <>
                <Route path="/" element={<Home userObj={userObj}/>}>
                    {Home}
                </Route>
                <Route path="/Profile" element={<Profile/>}>
                    {Profile}                
                </Route>
                </>) : (
                    <Route path="/" element={<Auth/>}>
                        {Auth}
                    </Route>
                )}
            </Routes>
        </Router>
    )
}

export default AppRouter;