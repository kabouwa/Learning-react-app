

export default function Loading() {
    const sameClasses = " border-8 rounded-full flex justify-center items-center animate-spin"
    return (
        <div className="loading-frame flex justify-center items-center h-125 animate-fade-in">
            <div className={"loading w-20 h-20 border-t-white/50 border-b-white/50 border-l-white/50  border-r-indigo-600" + sameClasses}>
                {/* <div className={"w-22 h-22 border-l-blue-500 border-r-blue-500" + sameClasses}>
                    <div className={"w-16 h-16 border-t-blue-500 border-b-blue-500" + sameClasses}>
                    
                    </div>
                </div> */}
            </div>
        </div>
    )
}