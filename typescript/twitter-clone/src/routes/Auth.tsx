import React, { useState } from "react";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GithubAuthProvider, 
    GoogleAuthProvider, 
    signInWithPopup} from "@firebase/auth";
import { authService } from "../fBase";
import { FirebaseError } from "@firebase/util";

const inputStyles = {};


const Auth = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [newAccount, setNewaccount]= useState(true);
const [error, setError] = useState("");

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = event;
    if (name === "email") {
        console.log(value);
        setEmail(value);
    } else if (name === "password"){
        setPassword(value);
    }
}
const toggleAccount = () => setNewaccount((prev) => !prev);
const onSocialClick = async (event: any) => {
    const {target: {name}, } = event;
    let provider;
    try {
        if (name === "google") {
            provider = new GoogleAuthProvider();
            const result = await signInWithPopup(authService, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
        } else if (name === "github") {
            provider = new GithubAuthProvider();
            const result = await signInWithPopup(authService, provider);
            const credential = GithubAuthProvider.credentialFromResult(result);
        }
        } catch (error) {
        console.log(error);
    }
}

const onSubmit = async(event: any) => {
    event.preventDefault();
    try{
        let data;
        if (newAccount) {
            data = await createUserWithEmailAndPassword(authService, email, password);
        } else {
            data = await signInWithEmailAndPassword(authService, email, password);
        }
        console.log(data);
    } 
    catch(error){
        if (error instanceof FirebaseError){
            setError(error.message);
        }
    }    
}
return(
<div>
    <form onSubmit={onSubmit} className="container">
        <input name="email" type="email" placeholder="Email" value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} required />
        {error}
    </form>
    <span className="authSwitch" onClick = {toggleAccount}> {newAccount ? "Sign In" : "Create Account"} </span>
    <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
    </div>
</div>
)
}
export default Auth;