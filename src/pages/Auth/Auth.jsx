import { useRef, useState } from "react"
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";

export default function Auth({ showLogin=true }) {
    const [login,setLogin] = useState(showLogin);
    const loginRadio = useRef(null);
    const handleSwitchForm = () => {
        setLogin(
            loginRadio.current.checked
        )
    }

    return (
        <>
        <h1 className="text-center mb-4">Log in or sign up</h1>

        <p className="text-center mb-4">
            Sign in to your account to enjoy a faster and more personalized shopping experience.
        </p>

        <div className="bg-gray-500 max-w-xl mx-auto p-1 rounded-xl flex gap-2">
            <input  onChange={handleSwitchForm} type="radio" name="form-toggler" id="login-form" ref={loginRadio} className="hidden" />
            <input  onChange={handleSwitchForm} type="radio" name="form-toggler" id="register-form" className="hidden" />

            <label htmlFor="login-form"
                className={"flex-1 py-2 text-center font-bold cusror-pointer text-white rounded-xl cursor-pointer transition-all duration-300" + (login ? " bg-indigo-500" : '')}
            >Login</label>

            <label htmlFor="register-form"
                className={"flex-1 py-2 text-center font-bold cusror-pointer text-white rounded-xl cursor-pointer transition-all duration-300" + (!login ? " bg-indigo-500" : '')}
            >Register</label>
        </div>

        {
            login 
            ? <LoginForm />
            : <RegisterForm />
        }
        </>
    )
}