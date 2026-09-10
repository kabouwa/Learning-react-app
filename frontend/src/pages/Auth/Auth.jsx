import { useState } from "react"
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";

export default function Auth({ showLogin=true }) {
    const [login,setLogin] = useState(showLogin);

    return (
        <>
        <h1 className="text-center mb-4">Log in or sign up</h1>

        <p className="text-center mb-4">
            Sign in to your account to enjoy a faster and more personalized shopping experience.
        </p>

        <div className="bg-gray-500 max-w-xl mx-auto rounded-xl flex gap-2 overflow-hidden text-center font-semibold text-white">
            <input onChange={() => setLogin(true)} type="radio" name="form-toggler" id="login-form" checked={login} className="hidden" />
            <input onChange={() => setLogin(false)} type="radio" name="form-toggler" id="register-form" checked={!login} className="hidden" />

            <label htmlFor="login-form"
                className={"flex-1 py-2 cusror-pointer transition-all duration-300" + (login ? " bg-indigo-500" : '')}
            >Login</label>

            <label htmlFor="register-form"
                className={"flex-1 py-2 cusror-pointer transition-all duration-300" + (!login ? " bg-indigo-500" : '')}
            >Register</label>
        </div>

        <div className="relative">
            <LoginForm setLogin={setLogin} classes={login ? 'animate-fade-in relative' : 'hidden'} />
            <RegisterForm setLogin={setLogin} classes={!login ? 'animate-fade-in relative' : 'hidden'} />
        </div>
        </>
    )
}