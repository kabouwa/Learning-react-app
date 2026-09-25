import { memo } from "react";
import { useScrollContainer } from "../../context/ScrollContainerContext";

function ScrollButton({ to, down=true, startOfPage=false }) {
    const scrollRef = useScrollContainer();

    const handleLinkClick = (e) => {
        if(startOfPage) {
            e.preventDefault();
            scrollRef.current?.scrollTo({
                top : 0,
                behavior : 'smooth'
            });
        }
    }

    return (
        <div className="hidden md:block absolute bottom-10 left-1/2 translate-x-[-50%] animate-bounce">
            <a href={"#" + to.trim()} onClick={handleLinkClick}
                className=' bg-indigo-500/20 px-6 py-2 rounded-2xl ring-2 ring-white/20 shadow-xl shadow-indigo-500/50 text-white hover:bg-indigo-500/30 hover:text-black transition-all duration-300'>
                <i className={`fa-solid fa-arrow-${down ? 'down' : 'up'}-long text-inherit`}></i>
            </a>
        </div>
    )
}

export default memo(ScrollButton);