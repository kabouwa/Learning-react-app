import ReactIcon from '/favicon.svg'
import Divider from "../Utilities/Divider"
import { NavLink } from "react-router-dom" 
import { useEffect } from 'react';
import { House, LayoutDashboard, LogIn, PanelLeftClose, PanelLeftOpen, Store, Timer, UserRoundPlus } from "lucide-react";
import ThemeToggler from "../Utilities/ThemeToggler";


function SideBarLink({routeData, sideBarOpened}) {
    const {title, link, icon} = routeData;

    return (
        <NavLink 
            to={link} 
            className={
                ({isActive }) => `relative px-1.5 md:px-3 py-2 md:py-2 hover:text-indigo-500 focus:text-indigo-500
                transition-all duration-200 outline-0 text-left text-nowrap flex items-center gap-3 
                focus:before:w-full before:absolute before:left-0 before:h-full before:transition-all before:z-10 before:w-0 before:rounded-2xl
                hover:before:w-full before:bg-white
                after:bg-indigo-500 after:absolute after:-right-1.5 after:h-[70%] after:transition-all after:z-10 after:w-0 after:rounded-2xl
                ${isActive ? 'cursor-default after:animate-fade-in-to-bottom' : 'after:animate-fade-out-to-top'}
                ${ sideBarOpened ? 'after:w-1.5' : 'after:w-1'}`
            }
        >
            <span className='z-20'>
                {icon}
            </span>

            <span className={`transition-all duration-300 z-20 ${sideBarOpened ?  '' : 'opacity-0 pointer-events-none'}`}>{title}</span>

        </NavLink>
    )
}

const routesData = [
    {title: 'Home',         link: '/',                     position: "top",     icon: <House />},
    {title: 'Counter',      link: '/counter',              position: "top",     icon: <Timer />},
    {title: 'Dashboard',    link: '/dashboard',            position: "top",     icon: <LayoutDashboard />},
    {title: 'Products',     link: '/dashboard/products',   position: "top",     icon: <Store />},
    {title: 'Login',        link: '/auth/login',           position: "bottom",  icon: <LogIn />},
    {title: 'Register',     link: '/auth/register',        position: "bottom",  icon: <UserRoundPlus />},
]

export default function SideBar({ sideBarOpened, setSideBarOpened }) {

    useEffect(() => {
        document.body.classList.toggle(
            "overflow-y-hidden",
            sideBarOpened
        );

    }, [sideBarOpened]);

    return (
        <>
        <aside className={`bg-gray-300 dark:bg-gray-900/75 dark:md:bg-gray-800/75  backdrop-blur-2xl rounded-2xl border fixed md:h-[calc(100vh-1.3rem)] flex flex-col z-80 opacity-100
            shadow-md shadow-white/18 p-1.5 transition-all duration-400 
                ${
                    sideBarOpened 
                    ? 'w-[70%] md:w-52' 
                    : 'w-16 scale-0 md:scale-100'
                }`
            }>
            
            <button onClick={() => setSideBarOpened(prev => !prev)}
                className="aside-toggle w-8 h-8 bg-gray-300/90 dark:bg-gray-800/90 rounded-circle hidden md:flex justify-center items-center backdrop-blur-2xl absolute -right-4 top-6 z-50">
                <span className="transition-all">
                    {sideBarOpened ? <PanelLeftClose /> : <PanelLeftOpen />}
                </span>
            </button>

            <div className="mt-4 mb-2 flex flex-col justify-center items-center transition-all duration-400">
                <img src={ReactIcon} alt="React Icon" className="h-28" />
                <Divider label="React Library" />
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <nav className="flex flex-col gap-2 w-full">
                    {
                        routesData.filter(route  =>  route.position.toLowerCase() == 'top')
                        .map(routeData  => (
                            <SideBarLink key={routeData.link}  routeData={routeData} sideBarOpened={sideBarOpened} />
                        ))
                    }
                </nav>

                <nav className="flex flex-col gap-2 w-full">
                    <Divider />
                    <ThemeToggler sideBarOpened={sideBarOpened} />

                    {
                        routesData.filter(route  =>  route.position.toLowerCase() == 'bottom')
                        .map(routeData => (
                            <SideBarLink key={routeData.link}  routeData={routeData} sideBarOpened={sideBarOpened} />
                        ))
                    }
                </nav>
            </div>
            
        </aside>

        <div onClick={() => setSideBarOpened(false)}
            className={`block md:hidden fixed top-0 left-0 w-screen h-full bg-gray-900/70 backdrop-blur-xl z-70 cursor-pointer transition-all ${sideBarOpened ? 'animate-fade-in' : 'animate-fade-out'}`}> 
        </div>

        </>
    )
}