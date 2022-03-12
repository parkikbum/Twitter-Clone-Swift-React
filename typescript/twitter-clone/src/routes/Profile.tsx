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
        console.log(userObj.displayName)
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { displayName: newDisplayName });
            refreshUser();
        }
    }
    return (
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input onChange={onChange} 
            type="text" 
            autoFocus
            placeholder="Display name" 
            value={newDisplayName} 
            className="formInput"
            />
            <input 
            type="submit"
            className="formBtn"
            value="Update Profile"
            style={{
                marginTop: 10
            }} 
            />
        </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    )
};
export default Profile;