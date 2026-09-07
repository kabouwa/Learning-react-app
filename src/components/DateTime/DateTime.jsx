import { useEffect, useState } from "react"

export default function DateTime({fixed= false}) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const dateInterval = setInterval(() => {
            setDate(new Date())
        },1000)

        return () => {
            clearInterval(dateInterval)
        } 
    },[])

    const dateTime = `${date.toDateString()} - ${date.toLocaleTimeString()} `
    return (
        <div className={`font-bold text-white bg-white/4 backdrop-blur-md rounded-xl py-1 px-3${fixed ? " fixed bottom-3 right-3" : ''}` } >
            {dateTime}
        </div>
    )
}