import React, { useEffect, useState } from "react";
import { dbService } from "../fBase";
import {addDoc, collection, getDocs, onSnapshot, orderBy, query, where} from "firebase/firestore";
import { DocumentData} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface SnapshotData{
    data: DocumentData;
    id: string;
    creatorId: string;
}

const Home = () => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState<SnapshotData[]>([]);
    var uid: any = 123
    
    useEffect(() => {
        onAuthStateChanged(getAuth(), (user) => {
          console.log(user);
          if(user) {
            uid = user.uid;
          } else{
          }
        });
      }, []);

    const getTweets = async () => {
        const dbTweets = await getDocs(collection(dbService, "tweeet"));

        const q = query(collection(dbService, "tweeet"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const tweetObject: SnapshotData = {
                data: doc.data(),
                id: doc.id,
                creatorId: uid
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
                creatorId: uid
            }));
            console.log(tweeterArr);
            setTweets(tweeterArr);
        })
        // getTweets();
    }, [])


    const onSubmit =async(e: any) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "tweeet"),{
                text: tweet,
                createdAt: Date.now(),
                creatorId: uid
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
            <h4>{tweet.data.text}</h4>
        </div>)}
    </div>
</div>)
}
export default Home; 