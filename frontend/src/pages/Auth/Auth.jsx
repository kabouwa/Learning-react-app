import { useEffect, useState } from "react"
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import { Link } from "react-router-dom" 


export default function Auth({ showLogin=true }) {
    const [login,setLogin] = useState(showLogin);

    useEffect(() => {
        const route = location.pathname
        setLogin(
            route.startsWith('/store/login')
        )
    })

    return (
        <>
        <h1 className="text-center mb-4">Log in or sign up</h1>

        <p className="text-center mb-4">
            Sign in to your account to enjoy a faster and more personalized shopping experience.
        </p>

        <div className="bg-gray-500 max-w-xl mx-auto rounded-xl flex gap-2 overflow-hidden text-center font-semibold text-white">
            <Link to="/store/login" className={"flex-1 py-2 cursor-pointer transition-all duration-300" + (login ? " bg-indigo-500" : '')}>
                Login
            </Link>

            <Link to="/store/register" className={"flex-1 py-2 cursor-pointer transition-all duration-300" + (!login ? " bg-indigo-500" : '')}>
                Register
            </Link>
        </div>

        <div className="relative">
            <LoginForm classes={login ? 'animate-fade-in relative' : 'hidden'} />
            <RegisterForm classes={!login ? 'animate-fade-in relative' : 'hidden'} />
        </div>
        </>
    )
}