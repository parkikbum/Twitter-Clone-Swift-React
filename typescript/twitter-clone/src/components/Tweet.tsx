import { async } from "@firebase/util";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../fBase";

const Tweet = ({tweetObj, isOwner}: any) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.data.text);
    const TweetTextRef = doc(dbService, "tweeet", `${tweetObj.id}`);
    console.log(tweetObj.id)
    const onDeleteClick = async () => {
        const ok = window.confirm("정말 이 트윗을 지우시겠습니까?");
        if (ok){
            await deleteDoc(TweetTextRef)
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event: any) => {
        event.preventDefault();
        console.log(newTweet);
        await updateDoc(TweetTextRef, {text: newTweet});
        setEditing(false);
    }

    const onChange = (event: any) => {
        const {target: {value},} 
        = event;
        setNewTweet(value);
    } 
    return (
    <div>
        {editing ? (
        <>
        <form onSubmit = {onSubmit}>
            <input type="text" placeholder="트윗 수정하기" value={newTweet} required onChange={onChange}/> 
            <input type="submit" value="트윗 업데이트 하기"/>
        </form>
        <button onClick={toggleEditing}>취소</button>
        </>
        ) : (
        <>
        <h4>{tweetObj.data.text}</h4>
        {isOwner && (
            <>
            <button onClick={onDeleteClick}>Delete Tweet</button>
            <button onClick={toggleEditing}>Edit Tweet</button>
            </>
        )}
        </>
    )}
    </div>)
    };

export default Tweet;