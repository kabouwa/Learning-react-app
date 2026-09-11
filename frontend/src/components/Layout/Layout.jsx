
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'
import SideBar from './SiderBar';
import Footer from './Footer'
import DateTime from '../Utilities/DateTime';

export default function Layout() {
    const [asideOpened, setAsideOpened] = useState(false);

    return (
        <div className='relative text-white mx-auto bg-gray-900/90 h-screen max-h-screen overflow-hidden flex px-1.5 py-2.5'>

            <SideBar sideBarOpened={asideOpened} setSideBarOpened={setAsideOpened} />

            <button onClick={() => setAsideOpened(prev => !prev)}
                className="aside-toggle w-7 h-7 bg-white/90 rounded-circle flex md:hidden justify-center items-center backdrop-blur-2xl fixed left-4 top-5 z-70">
                <i className={`fa-solid fa-bars text-indigo-500 transition-all`}></i>
            </button>

            <div className='py-0 px-1.5 md:px-6 flex-2 overflow-auto h-full flex flex-col'>
                <Header />
                
                <main className="my-14 flex-1">
                    <Outlet />
                </main>

                <Footer />
            </div>

            <DateTime fixed={true} hiddenOnPhone={true} />
        </div>
    )
}