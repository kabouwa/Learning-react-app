import ReactIcon from '/favicon.svg'
import Divider from "../Utilities/Divider"
import { NavLink } from "react-router-dom" 

function SideBarLink({routeData, sideBarOpened}) {
    const {title, link, icon} = routeData;

    return (
        <NavLink 
            to={link} 
            className={
                ({isActive }) => `px-1.5 md:px-3 py-2 md:py-2 hover:bg-white hover:text-indigo-500 rounded-4 cursor-pointer
                transition-all duration-200 outline-0 focus:bg-white focus:text-indigo-500 text-left text-nowrap
                ${isActive ? ' cursor-not-allowed bg-white text-indigo-600 ' : ''} `  
            }
        >
            <i className={"fa-solid mr-4 text-xl " + icon}></i>
            <span className={`transition-all duration-300 ${sideBarOpened ?  '' : 'opacity-0 pointer-events-none'}`}>{title}</span>
        </NavLink>
    )
}

export default function SideBar({ sideBarOpened, setSideBarOpened }) {

    const routesData = [
        {title: 'Home',         link: '/',                      position: "top",     icon: 'fa-house'},
        {title: 'Counter',      link: '/counter',               position: "top",     icon: 'fa-stopwatch'},
        {title: 'Products',     link: '/store/products',        position: "top",     icon: 'fa-store'},
        {title: 'Login',        link: '/store/login',    position: "bottom",  icon: 'fa-right-to-bracket'},
        {title: 'Register',     link: '/store/register', position: "bottom",  icon: 'fa-solid fa-user-plus'},
    ]

    return (
        <aside className={`bg-white/25 backdrop-blur-2xl h-full rounded-2xl border fixed md:relative md:flex flex-col z-80
            shadow-md shadow-white/18 p-1.5 max-w-70 transition-all duration-400 ${sideBarOpened ?  'w-70' : 'hidden md:w-16'}`}>
            
            <button onClick={() => setSideBarOpened(prev => !prev)}
                className="aside-toggle w-7 h-7 bg-white/90 rounded-circle flex  justify-center items-center backdrop-blur-2xl absolute -right-3 top-10 z-50">
                <i className={`fa-solid fa-angles-down text-indigo-400 transition-all ${sideBarOpened ? 'rotate-90' : '-rotate-90'}`}></i>
            </button>

            <div className="mt-4 mb-2 flex flex-col justify-center items-center transition-all duration-400">
                <img src={ReactIcon} alt="React Icon" className="h-28" />
                <Divider label="React Libray" />
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <nav className="flex flex-col gap-2 w-full">
                    {
                        routesData.filter(route  =>  route.position.toLowerCase() == 'top')
                        .map((routeData, key) => (
                            <SideBarLink key={key}  routeData={routeData} sideBarOpened={sideBarOpened} />
                        ))
                    }
                </nav>


                <nav className="flex flex-col gap-2 w-full">
                    {
                        routesData.filter(route  =>  route.position.toLowerCase() == 'bottom')
                        .map((routeData, key) => (
                            <SideBarLink key={key}  routeData={routeData} sideBarOpened={sideBarOpened} />
                        ))
                    }
                </nav>
            </div>
            
        </aside>
    )
}