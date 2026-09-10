import { useState } from "react"
import ReactIcon from '../../../public/favicon.svg'
import Divider from "../Utilities/Divider"

function SideBarLink({title, icon, active, name, setActiveTab, setTabsData, sideBarOpened}) {

    const handleChangeTab = () => {
        setActiveTab(name)
        setTabsData(prev =>
            [...prev].map(tab => {
                tab.active = tab.name === name
                return tab
            })
        )
    }

    return (
        <button 
            className="px-1.5 md:px-3 py-2 md:py-2 hover:bg-white hover:text-indigo-500 disabled:text-indigo-500 
            disabled:bg-white disabled:cursor-not-allowed rounded-4 cursor-pointer transition-all
            duration-200 outline-0 focus:bg-white focus:text-indigo-500 text-left text-nowrap"
            disabled={active}
            onClick={() => {handleChangeTab()}}>
                <i className={"fa-solid mr-4 text-xl " + icon}></i>
                <span className={`${sideBarOpened ?  '' : 'transition-all duration-500 opacity-0 pointer-events-none'}`}>{title}</span>
        </button>
    )
}

export default function SideBar({ setActiveTab, sideBarOpened, setSideBarOpened }) {
    const lastActiveTab = localStorage.getItem('tab') ?? 'home'

    const [tabsData,setTabsData] = useState([
            {title: 'Home',         name: 'home',     position: "top",  icon: 'fa-house'},
            {title: 'Counter',      name: 'counter',  position: "top",  icon: 'fa-stopwatch'},
            {title: 'Products',     name: 'products', position: "top",  icon: 'fa-store'},
            {title: 'Authenticate', name: 'auth',     position: "bottom",  icon: 'fa-right-to-bracket'},
        ].map(tab => {
            tab.active = tab.name === lastActiveTab
            return tab
    }))


    return (
        <aside className={`bg-white/25 backdrop-blur-2xl h-full rounded-2xl border fixed md:relative md:flex flex-col z-80
            shadow-md shadow-white/18 p-1.5 max-w-70 transition-all duration-500 ${sideBarOpened ?  'w-70' : 'hidden md:w-16'}`}>
            
            <button onClick={() => setSideBarOpened(prev => !prev)}
                className="aside-toggle w-7 h-7 bg-white/90 rounded-circle flex  justify-center items-center backdrop-blur-2xl absolute -right-3 top-10 z-50">
                <i className={`fa-solid fa-angles-down text-indigo-500 transition-all ${sideBarOpened ? 'rotate-90' : '-rotate-90'}`}></i>
            </button>

            <div className="mt-4 mb-2 flex flex-col justify-center items-center transition-all duration-500">
                <img src={ReactIcon} alt="React Icon" className="h-28" />
                <Divider label="React Libray" />
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <nav className="flex flex-col gap-2 w-full">
                    {
                        tabsData.filter(tab  =>  tab.position.toLowerCase() == 'top')
                        .map((tab,index) => (
                            <SideBarLink key={index}  sideBarOpened={sideBarOpened} title={tab.title} icon={tab.icon} active={tab.active} name={tab.name} setActiveTab={setActiveTab} setTabsData={setTabsData} />
                        ))
                    }
                </nav>


                <nav className="flex flex-col gap-2 w-full">
                    {
                        tabsData.filter(tab  =>  tab.position.toLowerCase() == 'bottom')
                        .map((tab,index) => (
                            <SideBarLink key={index}  sideBarOpened={sideBarOpened} title={tab.title} icon={tab.icon} active={tab.active} name={tab.name} setActiveTab={setActiveTab} setTabsData={setTabsData} />
                        ))
                    }
                </nav>
            </div>
        </aside>
    )
}