import { useState } from "react"
import DateTime from "../DateTime/DateTime"

function HeaderLink({title, icon, active, name, setActiveTab, setTabsData}) {

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
            className="px-3 py-1 hover:bg-white hover:text-indigo-500 disabled:text-indigo-500 
            disabled:bg-white disabled:cursor-not-allowed rounded-4 cursor-pointer transition-all 
            duration-200 outline-0 focus:bg-white focus:text-indigo-500"
            disabled={active}
            onClick={() => {handleChangeTab()}}>
        <i className={"fa-solid " + icon}></i> {title}</button>
    )
}

export default function Header({setActiveTab}) {
    const lastActiveTab = localStorage.getItem('tab') ?? 'home'
    const [tabsData,setTabsData] = useState([
        {title: 'Home', icon: 'fa-house', name: 'home'},
        {title: 'Counter', icon: 'fa-stopwatch', name: 'counter'},
        {title: 'Products', icon: 'fa-store', name: 'products'},
    ].map(tab => {
        tab.active = tab.name === lastActiveTab
        return tab
    }))

    return (
        <header className="sticky h-18 top-4 z-50 w-full bg-gray-800/75 flex justify-between items-center px-6 rounded-2xl mb-3 shadow-sm backdrop-blur-md">
            <div className="text-center text-3xl capitalize font-bold">
                Javascript - React Library
            </div>

            <DateTime />

            <nav className="bg-gray-400/75 rounded-4xl p-1 flex gap-2">
                {tabsData.map((tab,index) => (
                    <HeaderLink key={index} title={tab.title} icon={tab.icon} active={tab.active} name={tab.name} setActiveTab={setActiveTab} setTabsData={setTabsData} />
                ))}
            </nav>
        </header>
    )
}
