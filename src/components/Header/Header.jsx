import { useState } from "react"

function HeaderLink({title,active,name,setActiveTab,setTabsData}) {
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
            className="px-3 py-1 hover:bg-white hover:text-gray-500 disabled:text-gray-500 disabled:bg-white disabled:cursor-not-allowed rounded-2xl cursor-pointer transition-all duration-200"
            disabled={active}
            onClick={() => {handleChangeTab()}}>
        {title}</button>
    )
}

export default function Header({setActiveTab}) {
    const lastActiveTab = localStorage.getItem('tab') ?? 'home'
    const [tabsData,setTabsData] = useState([
        {title: 'Home', name: 'home'},
        {title: 'Counter', name: 'counter'},
    ].map(tab => {
        tab.active = tab.name === lastActiveTab
        return tab
    }))

    return (
        <header className="bg-gray-800 flex flex-col items-center py-2 rounded-4xl mb-3">
            <div className="text-center mb-3 text-3xl capitalize font-bold">
                Javascript - React Library By kabouwa
            </div>

            <nav className="bg-gray-400/75 rounded-4xl p-1 flex gap-2">
                {tabsData.map((tab,index) => (
                    <HeaderLink key={index} title={tab.title} active={tab.active} name={tab.name} setActiveTab={setActiveTab} setTabsData={setTabsData} />
                ))}
            </nav>
        </header>
    )
}
