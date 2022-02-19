import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { authService } from "../fBase";

const Auth = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [newAccount, setNewaccount]= useState(true);

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = event;
    if (name === "email") {
        console.log(value);
        setEmail(value);
    } else if (name === "password"){
        setPassword(value);
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
    }
    //회원가입시 로그인도 바로 가능
    
}
return(
<div>
    <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} required />
    </form>
    <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
    </div>
</div>
)
}
export default Auth;