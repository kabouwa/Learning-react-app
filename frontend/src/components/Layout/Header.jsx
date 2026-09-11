import DateTime from "../Utilities/DateTime"

export default function Header() {
    return (
        <>
        <header className="sticky min-h-12 h-12 md:h-18 top-0 z-50 w-full bg-gray-800/75 flex flex-col md:flex-row justify-between 
            items-center gap-2 md:gap-0 py-2.5 md:py-0 px-6 rounded-2xl shadow-sm backdrop-blur-md">

            <div className="text-center text-xl md:text-3xl capitalize font-bold">
                Javascript - React Library
            </div>

            <DateTime />
        </header>
        </>
    )
}
