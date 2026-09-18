import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggler({ sideBarOpened }) {
    const { theme, toggleTheme } = useTheme();
    const isLight = theme === 'light';

    const handleShowTitle = (e) => {
        if (sideBarOpened) return
        const span = e.currentTarget.querySelector('#current-mode')
        span.classList.remove('opacity-0')
        span.classList.remove('scale-20')
        span.classList.add('opacity-100')
        span.classList.add('scale-100')
    }

    const handleHideTitle = (e) => {
        if (sideBarOpened) return
        const span = e.currentTarget.querySelector('#current-mode')
        span.classList.remove('opacity-100')
        span.classList.remove('scale-20')
        span.classList.add('opacity-0')
        span.classList.add('scale-100')
    }

    return (
        <button onClick={toggleTheme} onMouseEnter={handleShowTitle} onMouseLeave={handleHideTitle}
            type="button"
            className="relative px-1.5 md:px-3 py-2 md:py-2 hover:text-indigo-500 focus:text-indigo-500
                transition-all duration-200 outline-0 text-left text-nowrap flex items-center gap-3 
                focus:before:w-full before:absolute before:left-0 before:h-full before:transition-all before:z-10 before:w-0 before:rounded-2xl
                hover:before:w-full before:bg-white cursor-pointer 
                after:bg-indigo-500 after:absolute after:-right-1.5 after:h-[70%] after:transition-all after:z-10 after:w-0 after:rounded-2xl"
            >

            <span className="z-20">
                <span className={`${isLight ? 'animate-fade-in' : 'hidden'}`}>
                    <Sun />
                </span>
                <span className={`${!isLight ? 'animate-fade-in' : 'hidden'}`}>
                    <Moon />
                </span> 
            </span>

            <span id="current-mode" className={`transition-all duration-300 z-20 ${sideBarOpened ?  '' : 'pointer-events-none text-center ml-4 min-w-20 bg-white px-1 rounded opacity-0 scale-20'}`}>
                {
                    theme === 'light' ? 'Light' : 'Dark'
                } Mode
            </span>
        </button>
    )
}