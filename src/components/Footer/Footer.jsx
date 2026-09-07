import { useEffect, useState } from "react"

export default function Footer() {
    const [seconds,setSseconds] = useState(0)
   
    useEffect(() => {
        const addSecondsInterval = setInterval(() => {
            setSseconds(prev => prev + 1)
        },1000)
        return () => {
            clearInterval(addSecondsInterval)
        }
    },[])


    const hours = Math.floor( seconds / 3600 )
    const minutes = Math.floor( (seconds % 3600) / 60 )
    const secs = seconds % 60

    return (
        <footer className="bg-gray-800 flex flex-col items-center py-2 rounded-4xl mb-3">
            <div className="text-center">
                You're in application during {hours.toString().padStart(2,'0') + ' '} 
                hours, {minutes.toString().padStart(2,'0')} minutes and {' '} {secs.toString().padStart(2,'0')} seconds.
            </div>
            <div className="text-center">
                Devlopped By kabouwa.
            </div>
        </footer>
    )
}