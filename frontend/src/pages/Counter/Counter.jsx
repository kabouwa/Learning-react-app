import {  useEffect, useRef, useState } from "react"
import { useAlerts } from "../../Context/AlertsContext";
import style from './counter.module.css';  


export default function Counter() {
    const [counter,setCounter] = useState(0);
    const { clearAlerts, pushAlert } = useAlerts();
    const counterInput = useRef(null);

    const is_valid = (value) => value >= 0 && value <= 10000;

    const incrementCounter = () => {
        setCounter(prev => {
            if(is_valid(prev + 1)) {
                clearAlerts()
                return prev + 1
            }else{
                pushAlert({
                    type : "error",
                    accent : "Error",
                    message : "value cannot execced 10000",
               })
            }
            
        })
    };

    const decrementCounter = () => {
        setCounter(prev => {
            if(is_valid(prev - 1)) {
                clearAlerts()
                return prev - 1
            }else{
                pushAlert({
                    type : "error",
                    accent : "Error",
                    message : "Seconds cannot be less than 0",
               })
            }
            
        })
    }

    const handleChangeCounterValue = (e) => {
        e.preventDefault()
        const value = parseInt(counterInput.current.value)
        if(value == counter) return ;
        if( is_valid(value) ) {
           setCounter(value)
           pushAlert({
                type : "success",
                accent : "Done",
                message : `Seconds is changed succesffuly to ${value} !`,
                clearAlerts : true,
            })
        }else{
            pushAlert({
                type : "error",
                accent : "Error",
                message : "Seconds be between 0 and 10000",
            })
        }
    }

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
    }, [])

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="display-4 text-center font-bold mb-8">State & Event management : </h1>

            <section className='flex items-center justify-center gap-20 my-10'>
                <button 
                    className='block ring ring-indigo-500 rounded-4 bg-gray-400/20 fs-2 font-bold  cursor-pointer
                        transition-all hover:bg-gray-400/25 hover:ring-2 active:bg-indigo-500/50 p-5 flex jusitfy-center items-center'
                    onClick={decrementCounter}
                >-1</button>

                    <strong className="text-white/95 text-9xl text-shadow-lg text-shadow-indigo-500/20">{counter}</strong>

                <button 
                    className='block ring ring-indigo-500 rounded-4 bg-gray-400/20 fs-2 font-bold cursor-pointer
                        transition-all hover:bg-gray-400/25 hover:ring-2 active:bg-indigo-500/50 p-5 flex jusitfy-center items-center'
                    onClick={incrementCounter}
                >+1</button>
            </section>

            <h2 className="mb-10 fs-1 text-center">Custom seconds : </h2>

            <form className="flex flex-col md:flex-row items-center justify-center gap-2">
                <input id="input" type='number' ref={counterInput} placeholder="0"
                    className="shadow-2xs font-bold display-1 text-center text-white
                    h-40 w-30 outline-0 transition-all "
                />

                <button type="submit"
                    className='btn btn-secondary border rounder cursor-pointer h-40 w-30 text-2xl'
                    onClick={handleChangeCounterValue}
                >
                    <i class="fa-solid fa-pen-to-square me-2"></i>
                </button>

            </form>
        </div>
    )
}