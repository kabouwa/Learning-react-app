import {  memo, useCallback, useEffect, useRef, useState } from "react"
import { useAlerts } from "../../Context/AlertsContext";
// import style from './counter.module.css';  


function Counter( { minimum = 0, maximum = 10000}) {
    const [counter,setCounter] = useState(0);
    const { clearAlerts, pushAlert } = useAlerts();
    const counterInput = useRef(null);

    const is_valid = useCallback((value) => value >= minimum && value <= maximum, [minimum, maximum]) 

    const incrementCounter = useCallback( () => {
        setCounter(prev => {
            if(is_valid(prev + 1)) {
                clearAlerts()
                return prev + 1
            }else{
                pushAlert({
                    type : "error",
                    accent : "Error",
                    message : "value cannot execced " + maximum.toString(),
               })
            }
            
        })
    }, [is_valid, pushAlert, clearAlerts, maximum])

    const decrementCounter = useCallback( () => {
        setCounter(prev => {
            if(is_valid(prev - 1)) {
                clearAlerts()
                return prev - 1
            }else{
                pushAlert({
                    type : "error",
                    accent : "Error",
                    message : "Seconds cannot be less than " + minimum.toString(),
               })
            }
            
        })
    }, [is_valid, pushAlert, clearAlerts, minimum])

    const handleChangeCounterValue = useCallback( () => {
            const inp = counterInput.current;
            const value = parseInt(inp.value);
    
            if(value == counter) return ;
    
            if( is_valid(value) ) {
                inp.value = '';
                inp.blur();
                setCounter(value)
                pushAlert({
                     type : "success",
                     accent : "Done",
                     message : `Seconds is changed succesffuly to ${value} !`,
                     clearAlerts : true,
                });
    
            }else{
                pushAlert({
                    type : "error",
                    accent : "Error",
                    message : `Seconds be between ${minimum} and ${maximum}`,
                })
            }
    }, [is_valid, pushAlert, counter, minimum ,maximum])

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch(e.key) {
                case 'ArrowUp' :
                    incrementCounter();
                    break;
                case 'ArrowDown' :
                    decrementCounter();
                    break;
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [incrementCounter,decrementCounter])

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="display-4 text-center font-bold mb-8">State & Event management : </h1>

            <div className='flex items-center justify-between gap-10 my-10'>
                <button 
                    className='ring ring-indigo-500 rounded-4 bg-gray-400/20 fs-2 font-bold  cursor-pointer
                        transition-all hover:bg-gray-400/25 hover:ring-2 active:bg-indigo-500/50 p-5 flex jusitfy-center items-center'
                    onClick={decrementCounter}
                >-1</button>

                    <strong className="text-white/95 text-9xl text-shadow-lg text-shadow-indigo-500/20">{counter}</strong>

                <button 
                    className='ring ring-indigo-500 rounded-4 bg-gray-400/20 fs-2 font-bold cursor-pointer
                        transition-all hover:bg-gray-400/25 hover:ring-2 active:bg-indigo-500/50 p-5 flex jusitfy-center items-center'
                    onClick={incrementCounter}
                >+1</button>
            </div>

            <h2 className="fs-1 text-center">Custom value : </h2>

            <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-4 mt-10">
                <input type='number' ref={counterInput} placeholder={maximum} id="custom-counter-value"
                    className="ring ring-indigo-500 rounded-4 shadow-2xs font-bold display-1 text-center text-white
                    h-40 md:max-w-lg outline-0 transition-all focus:ring-2 focus:bg-gray-400/20"
                    onKeyDown={(e) => e.key == 'Enter' && handleChangeCounterValue() }
                />

                <label htmlFor="custom-counter-value" className="absolute top-2 left-4 text-2xl text-gray-400 pointer-events-none">{minimum} - {maximum}</label>

                <button type="button"
                    className='ring ring-indigo-500 rounded-4 bg-gray-400/20 fs-2 font-bold cursor-pointer
                        transition-all hover:bg-gray-400/25 hover:ring-2 active:bg-indigo-500/50 p-5 flex jusitfy-center items-center'
                    onClick={handleChangeCounterValue}
                >
                    <i class="fa-solid fa-pen-to-square me-2"></i>
                </button>

            </div>
        </div>
    )
}


export default memo(Counter);