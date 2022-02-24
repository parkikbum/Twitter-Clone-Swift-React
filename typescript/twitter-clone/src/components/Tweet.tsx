import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { dbService } from "../fBase";

const Tweet = ({tweetObj, isOwner}: any) => {
    const TweetTextRef = doc(dbService, "tweeet", `${tweetObj.id}`);
    console.log(tweetObj.id)
    const onDeleteClick = async () => {
        const ok = window.confirm("정말 이 트윗을 지우시겠습니까?");
        if (ok){
            await deleteDoc(TweetTextRef)
        }
    }
    return (
    <div>
        <h4>{tweetObj.data.text}</h4>
        {isOwner && (
            <>
            <button onClick={onDeleteClick}>Delete Tweet</button>
            <button>Edit Tweet</button>
            </>
        )}
    </div>
    )
};

export default Tweet;