import { async } from "@firebase/util";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { deleteObject, ref} from "@firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "../fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";


const Tweet = ({tweetObj, isOwner}: any) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.data.text);
    const TweetTextRef = doc(dbService, "tweeet", `${tweetObj.id}`);
    const onDeleteClick = async () => {
        const ok = window.confirm("정말 이 트윗을 지우시겠습니까?");
        if (ok){
            await deleteDoc(TweetTextRef);
            console.log(ref(storageService, tweetObj.attachmentUrl));
            const urlRef = ref(storageService, tweetObj.data.attachmentUrl);
            await deleteObject(urlRef);
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
    const trash = faTrash as IconProp
    const pencil = faPencilAlt as IconProp

    return (
    <div className="tweet">
        {editing ? (
        <>
        <form onSubmit = {onSubmit} className="container tweetEdit">
            <input type="text" className="formInput" placeholder="트윗 수정하기" value={newTweet} required onChange={onChange}/> 
            <input type="submit" value="트윗 업데이트 하기" className="formBtn"/>
        </form>
        <span onClick={toggleEditing} className="formBtn cancelBtn">취소</span>
        </>
        ) : (
        <>
        <h4>{tweetObj.data.text}</h4>
        {tweetObj.data.attachmentUrl && <img src={tweetObj.data.attachmentUrl} />}
        {isOwner && (
           <div className="tweet__actions">
                    <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={trash} />
                    </span>
                    <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={pencil} />
                    </span>
            </div>
        )}
        </>
    )}
    </div>)
    };

export default Tweet;