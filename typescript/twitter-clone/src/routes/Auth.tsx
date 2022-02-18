import React, { useState } from "react";

const Auth = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = event;
    if (name === "email") {
        console.log(value);
        setEmail(value);
    } else if (name === "password"){
        setPassword(value);
    }
}
const onSubmit = (event: any) => {
    event.preventDefault();
}
return(
<div>
    <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} />
        <input type="submit" value="Log In" required />
    </form>
    <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
    </div>
</div>
)
}
export default Auth;