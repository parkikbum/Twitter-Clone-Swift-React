import React from "react";
import { Link } from "react-router-dom";

const Navigation = (userObj: any) => {
    return(
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/Profile">{userObj.userObj.displayName}'s My Profile</Link>
            </li>
        </ul>
    </nav>
    )
};

export default Navigation;