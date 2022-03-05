import React, { useEffect, useRef, useState } from "react";
import { dbService, storageService } from "../fBase";
import {addDoc, collection, getDocs, onSnapshot, orderBy, query, where} from "firebase/firestore";
import { DocumentData} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import { v4 as uuidv4, v4} from "uuid";
import Tweet from "../components/Tweet";

interface SnapshotData{
    data: DocumentData;
    id: string;
    creatorId: string;
}

const Home = (userObj: any) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState<SnapshotData[]>([]);
    const [attachment, setAttachment] = useState<any>(""); 

    const getTweets = async () => {
        const dbTweets = await getDocs(collection(dbService, "tweeet"));
        const q = query(collection(dbService, "tweeet"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const tweetObject: SnapshotData = {
                data: doc.data(),
                id: doc.id,
                creatorId: userObj.userObj.uid
            };
            setTweets((prev: SnapshotData[]) => [tweetObject, ...prev]);
            console.log(tweetObject.data);
        });
    }
    useEffect(() => {
        const q = query(
            collection(dbService, "tweeet"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const tweeterArr = snapshot.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
                creatorId: userObj.userObj.uid
            }));
            setTweets(tweeterArr);
        })
    }, [])


    const onSubmit = async(e: any) => {
        e.preventDefault();
        let attachmentUrl: string = "";
        if (attachment != "") {
            const attachmentRef = ref(storageService, `${userObj.userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url")
            attachmentUrl = await getDownloadURL(response.ref)
        }
        try {
            const docRef = await addDoc(collection(dbService, "tweeet"),{
                text: tweet,
                createdAt: Date.now(),
                creatorId: userObj.userObj.uid,
                attachmentUrl: attachmentUrl
            });
            console.log("Document written with ID", docRef.id);
        } catch(error) {
            console.error("Error adding document", error);
        }
        setTweet("");
        setAttachment("");
        

    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {value}
        } = event;
            setTweet(value);
    }
    const onFileChange = (event: any) => {
        const {target: { files }} = event;  
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
        console.log(finishedEvent);
        const {
            currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
    }
    reader.readAsDataURL(theFile);
};
const fileInput: any = useRef();
const ClearAttachment = () => {
    setAttachment("");
    console.log(fileInput.current);
    fileInput.current.value = "";
};
return (
<div>
    <form onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind?" maxLength={120} value={tweet} onChange={onChange} />
        <input type="submit" value="tweeet" />
        <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput}/>
        {attachment && ( 
            <div>
                <img src ={attachment} width="50px" height="50px" />
                <button onClick={ClearAttachment}>Clear</button>
            </div>
        )}
    </form>
    <div>
        {tweets.map((tweet: any)=> (
            <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.data.creatorId === userObj.userObj.uid}/>
        ))}
    </div>
</div>)
}
export default Home; 