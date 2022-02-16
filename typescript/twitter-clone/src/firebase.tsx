import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCjxoZAVmEANH6G6kSKHaFF0BKRsSy7RDU",
    authDomain: "twitter-clone-6426d.firebaseapp.com",
    projectId: "twitter-clone-6426d",
    storageBucket: "twitter-clone-6426d.appspot.com",
    messagingSenderId: "335952733261",
    appId: "1:335952733261:web:05cd78047b1feaf982a804"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);