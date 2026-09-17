import { memo } from "react";

function ScrollButton({ to, down=true, startOfPage=false }) {

    const handleLinkClick = (e) => {
        if(startOfPage) {
            e.preventDefault();
            const container = document.querySelector('#scrollable');
            container.scrollTo(0,0);
        } 
    }

    return (
        <div className="hidden md:block absolute bottom-10 left-1/2 translate-x-[-50%] animate-bounce">
            <a href={"#" + to.trim()} onClick={handleLinkClick}
                className=' bg-indigo-500/20 px-6 py-2 rounded-2xl ring-2 ring-white/20 shadow-xl shadow-indigo-500/50 hover:bg-white/95 hover:text-indigo-500 transition-all duration-300'>
                <i className={`fa-solid fa-arrow-${down ? 'down' : 'up'}-long text-white dark:text-gray-900`}></i>
            </a>
        </div>
    )
}

export default memo(ScrollButton);