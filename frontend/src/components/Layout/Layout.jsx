
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'
import SideBar from './SiderBar';
import Footer from './Footer'
import DateTime from '../Utilities/DateTime';
import Alerts from '../Alerts/Alerts';
import ConfirmButton from '../Forms/ConfirmButton';

export default function Layout() {
    const [sideBarOpened, setSideBarOpened] = useState(true);
    const [alerts, setAlerts] = useState([]);


    return (
        <div className='relative text-white mx-auto bg-gray-900/90 h-screen max-h-screen overflow-hidden px-1.5 py-2.5'>

            <SideBar sideBarOpened={sideBarOpened} setSideBarOpened={setSideBarOpened} />

            <button onClick={() => setSideBarOpened(prev => !prev)}
                className="aside-toggle w-7 h-7 bg-white/90 rounded-circle flex md:hidden justify-center items-center backdrop-blur-2xl fixed left-4 top-3.5 z-70">
                <i className={`fa-solid fa-bars text-indigo-500 transition-all`}></i>
            </button>

            <div id='scrollable' className={`py-0 px-1.5 md:px-6 overflow-auto h-full flex flex-col ml-auto transiton-all duration-400 ${sideBarOpened ? 'md:w-[calc(100%-13.5rem)]' : 'md:w-[calc(100%-4.5rem)]'}` }>
                <Header />
                
                <main className="my-14 flex-1">
                    {/* <div className="ml-auto max-w-md">
                        <ConfirmButton classes={'block fixed left-0 top-20'} type='button' onClick={addAlertHandler} label={'Alert'} classes='w-40' />
                    </div> */}

                    <Outlet />
                </main>


                <Footer />
            </div>

            <Alerts alerts={alerts} />

            <DateTime fixed={true} hiddenOnPhone={true} />
        </div>
    )
}