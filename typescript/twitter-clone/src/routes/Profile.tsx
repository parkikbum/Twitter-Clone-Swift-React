import { updateProfile } from "@firebase/auth";
import { collection, getDocs, query, where } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fBase";

interface profileType {
    userObj: any,
    refreshUser: any
}


const Profile = ({userObj, refreshUser}: any) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const onChange = (event: any) =>{
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }
    const navigate = useNavigate(); 
    const getMyTweets = async() => {
        const q = query(
            collection(dbService, "tweeet"),
            where("creatorId", "==", userObj.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
    };
    useEffect(() => {
        getMyTweets();
    }, [userObj])
    const onSubmit = async (event: any) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { displayName: newDisplayName });
            refreshUser();
        }
    }
    return (
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
            <input type="submit" value="Update Profile" />
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};
export default Profile;