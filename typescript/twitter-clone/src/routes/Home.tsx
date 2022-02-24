import React, { useEffect, useState } from "react";
import { dbService } from "../fBase";
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import { DocumentData} from "firebase/firestore";

interface SnapshotData{
    data: DocumentData;
    id: string;
}

const Home = () => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState<SnapshotData[]>([]);
    
    const getTweets = async () => {
        const dbTweets = await getDocs(collection(dbService, "tweeet"));

        const q = query(collection(dbService, "tweeet"));
        const querySnapshot = await getDocs(q);


        querySnapshot.forEach((doc) => {
            const tweetObject: SnapshotData = {
                data: doc.data(),
                id: doc.id
            };
            setTweets((prev: SnapshotData[]) => [tweetObject, ...prev]);
            console.log(tweetObject.data);
        });
    }
    useEffect(() => {
        getTweets();
    }, [])


    const onSubmit =async(e: any) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "tweeet"),{
                tweet,
                createdAt: Date.now(),
            });
            console.log("Document written with ID", docRef.id);
        } catch(error) {
            console.error("Error adding document", error);
        }
        setTweet("");
    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {value}
        } = event;
            setTweet(value);
    }
    return (
<div>
    <form onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind?" maxLength={120} value={tweet} onChange={onChange} />
        <input type="submit" value="tweeet" />
    </form>
    <div>
        {tweets.map(tweet => 
        <div key={tweet.id}>
            <h4>{tweet.data.tweet}</h4>
        </div>)}
    </div>
</div>)
}
export default Home; 