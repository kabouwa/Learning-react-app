import { useState } from 'react'
import './App.css'  
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Home from './pages/Home/Home'
import Counter  from './pages/Counter/Counter'
import ProductsList from './pages/Products/ProductsList'
import DateTime from './components/Utilities/DateTime'
import Auth from './pages/Auth/Auth'
import SideBar from './components/Layout/SiderBar'

function AppContent() {
    const [activeTab,setActiveTab] = useState(localStorage.getItem('tab') ?? 'home')
    const [sideBarOpened, setSideBarOpened] = useState(true);

    const setActiveTabHandler = (value) => {
        localStorage.setItem('tab',value)
        setActiveTab(value)
    } 

    return (
        <div className='relative text-white mx-auto bg-gray-900/90 h-screen max-h-screen overflow-hidden flex p-3'>

            <SideBar setActiveTab={setActiveTabHandler} sideBarOpened={sideBarOpened} setSideBarOpened={setSideBarOpened}  />

            <button onClick={() => setSideBarOpened(prev => !prev)}
                className="aside-toggle w-7 h-7 bg-white/90 rounded-circle flex md:hidden justify-center items-center backdrop-blur-2xl fixed left-4 top-5 z-70">
                <i className={`fa-solid fa-bars text-indigo-500 transition-all`}></i>
            </button>   


            <div className='py-0 px-1.5 md:px-6 flex-2 overflow-auto'>
                <Header setActiveTab={setActiveTabHandler} />
                
                <main className="my-14">
                    {
                        activeTab === 'home' ? <Home />
                        : activeTab === 'counter' ? <Counter />
                        : activeTab === 'products' ? <ProductsList />
                        : activeTab === 'auth' ? <Auth />
                        : <Home />
                    } 
                </main>
                <Footer />
            </div>

            <DateTime fixed={true} hiddenOnPhone={true} />
        </div>
    )
}



export default function App() {
    return (
        <>
            <AppContent />
        </>
    )
}