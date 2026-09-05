import { useEffect, useRef, useState } from "react"
import Alert from '../../components/Alerts/Alert'

export default function Counter() {
    const [counter,setCounter] = useState(0),
    [alerts, setAlerts] = useState([]),
    counterInput = useRef(null);

    const is_valid = (value) => value >= 0 && value <= 100;


    const autoIncrement = () => {
        setTimeout(()=> {
            let value = counter + 1
            setCounter(
                is_valid(value) ? value : 0
            )
        },1000)
    }
    useEffect(() => {
        autoIncrement()
    }, [counter])

    const handleAddToCounterValue = () => {
        const value = counter + 1
        
        if( is_valid(value) ) {
            setCounter(counter + 1)
            setAlerts([])
        }else {
            setAlerts(prev => [
                ...prev,
                {
                    type : "error",
                    accent : "Error",
                    message : "value cannot execced 100",
                }
            ].slice(-3))
        }
    };

    const handleSubtractFromCounterValue = () => {
        const value = counter - 1

        if( is_valid(value) ) {
            setCounter(counter - 1)
            setAlerts([])
        }else {
            setAlerts(prev => [
                ...prev,
                {
                    type : "error",
                    accent : "Error",
                    message : "Seconds cannot be less than 0",
                }
            ].slice(-3))
        }
    }

    const handleChangeCounterValue = () => {
        const value = parseInt(counterInput.current.value)
        if(value == counter) return ;
        if( is_valid(value) ) {
           setCounter(value)
           setAlerts([{
                type : "success",
                accent : "Done",
                message : `Seconds is changed succesffuly to ${value} !`,
            }])
        }else{
            setAlerts(prev => [
                ...prev,
                {
                    type : "error",
                    accent : "Error",
                    message : "Seconds be between 0 and 1000",
                }
            ].slice(-3))
        }
    }

    return (
        <>
        <h1 className="text-4xl text-center font-bold mb-8">State & Event management : </h1>


        <h1 className="text-4xl text-center">Counter is : <strong>{counter}</strong></h1>
        <section className='flex items-center justify-center gap-2 my-10'>
            <button 
                className='block border rounded bg-gray-400 font-bold flex-1 cursor-pointer h-10 pb-1 text-2xl'
                onClick={handleAddToCounterValue}
            >+1</button>

            <button 
                className='block border rounded bg-gray-400 font-bold flex-1 cursor-pointer h-10 pb-1 text-2xl'
                onClick={handleSubtractFromCounterValue}
            >-1</button>
        </section>

        <h2 className="mb-10 text-4xl text-center">Custom seconds : </h2>

        <section className='flex items-center justify-center gap-2'>
            <input id="input" type='number' ref={counterInput} placeholder="0"
            className="border shadow-2xs rounded bg-gray-400 font-bold flex-1 h-10 outline-0 focus:scale-101 transition-all px-3"
            />
            <button 
                className='border rounded bg-gray-400 flex-1 cursor-pointer h-10 text-2xl'
                onClick={handleChangeCounterValue}
            >Set seconds [0-1000]</button>
        </section>

        {
            alerts.length ?  (
                <section className="alerts my-6">
                    {[...alerts].reverse().map(
                        (error,index) => (
                            <Alert key={index} type={error.type} accent={error.accent} > 
                                {error.message} 
                            </Alert>
                        )
                    )}
                </section>
            ) : null
        }
        </>
    )
}