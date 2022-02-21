import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../fBase";

const Profile = () => {
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const navigate = useNavigate();
    return (
        <>
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};
export default Profile;