import React, { useState } from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

interface logged {
    isLoggedIn: any;
}

const AppRouter = ({isLoggedIn}: logged) => {
    return(
        <Router>
            <Routes>
                {isLoggedIn ? (
                <>
                <Route path="/" element={<Home/>}>
                    {Home}
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