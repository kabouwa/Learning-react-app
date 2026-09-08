import { useState } from "react"
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";

export default function Auth({ showLogin=true }) {
    const [login,setLogin] = useState(showLogin);

    return (
        <>
        <h1>Authentication</h1>
        <button onClick={() => setLogin(prev => !prev)}>Switch</button>
        {
            login 
            ? <LoginForm />
            : <RegisterForm />
        }
        </>
    )
}