import React, { useState } from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

interface logged {
    isLoggedIn: any;
    userObj: any;
    refreshUser: any;
}

const AppRouter = ({isLoggedIn, userObj, refreshUser}: any) => {
    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? (
                <>
                <Route path="/" element={<Home userObj={userObj}/>}>
                    {Home}
                </Route>
                <Route path="/Profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}>
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