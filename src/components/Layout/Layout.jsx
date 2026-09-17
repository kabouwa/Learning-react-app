
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'
import SideBar from './SiderBar';
import Footer from './Footer'
import DateTime from '../Utilities/DateTime';
import Alerts from '../Alerts/Alerts';
import { Menu, X } from 'lucide-react';
import LoadingModal from '../Utilities/Loading';

export default function Layout() {
    const [sideBarOpened, setSideBarOpened] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            setSideBarOpened(
                w > 1350 ? true : false
            )
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize)
        
    }, [])
    
    return (
       <div className='relative dark:text-white mx-auto bg-gray-100/70 dark:bg-gray-900/90 h-screen max-h-screen overflow-hidden px-1.5 py-2.5'>

           <SideBar sideBarOpened={sideBarOpened} setSideBarOpened={setSideBarOpened} />

            {/* Sidebar phone toggler */}
           <button onClick={() => setSideBarOpened(prev => !prev)}
               className="aside-toggle w-8 h-8 bg-white/80 rounded-circle flex md:hidden justify-center items-center backdrop-blur-2xl fixed right-6.5 top-3.5 z-70">
               <span className='text-indigo-500 transition-all text-8xl'>
                    {
                        sideBarOpened ? <X size={20} /> : <Menu size={20} /> 
                    }
               </span>
           </button>

            {/* Main Layout */}
           <div id='scrollable' className={`py-0 px-1.5 md:px-6 overflow-auto h-full flex flex-col ml-auto transiton-all duration-400 ${sideBarOpened ? 'md:w-[calc(100%-13.5rem)]' : 'md:w-[calc(100%-4.5rem)]'}` }>
               <Header />
               
               <main className="my-14 flex-1">
                   <Outlet />
               </main>

               <Footer />
           </div>

           <LoadingModal />
           <Alerts />
           

           <DateTime fixed={true} hiddenOnPhone={true} />
       </div>
    )
}