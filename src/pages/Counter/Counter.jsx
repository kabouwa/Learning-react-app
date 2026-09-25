import {  memo, useCallback, useEffect, useRef, useState } from "react"
import { useAlerts } from "../../context/AlertsContext";
import './counter.module.css';  
import { SquarePen } from "lucide-react";
import withCounter from "../../hoc/withCounter";
import { motion } from "framer-motion";

function Counter( { minimum = 0, maximum = 10000, title, hcoFunc = () => {}}) {
    const [counter,setCounter] = useState(0);
    const { clearAlerts, pushAlert } = useAlerts();
    const counterInput = useRef(null);

    const is_valid = useCallback((value) => value >= minimum && value <= maximum, [minimum, maximum]) 

    const incrementCounter = useCallback( () => {
        setCounter(prev => {
            if(is_valid(prev + 10)) {
                clearAlerts()
                return prev + 10
            }else{
                pushAlert({
                    type : "error",
                    message : "value cannot execced " + maximum.toString(),
                    clearAlerts : true,
               });
               return prev;
            }
        });
    }, [is_valid, pushAlert, clearAlerts, maximum]);

    const decrementCounter = useCallback( () => {
        setCounter(prev => {
            if(is_valid(prev - 10)) {
                clearAlerts();
                return prev - 10;
            }else{
                pushAlert({
                    type : "error",
                    message : "Seconds cannot be less than " + minimum.toString(),
                    clearAlerts : true,
               });
               return prev;
            } 
        });
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
                    type : "warning",
                    message : `Seconds must be between ${minimum} and ${maximum}`,
                    clearAlerts : true,
                })
            }
    }, [is_valid, pushAlert, counter, minimum ,maximum]);


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e?.target?.type === 'number') return ;
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
    }, [incrementCounter,decrementCounter]);


    useEffect(() => {
        hcoFunc('This Function come from HCO and can be used in other components')
    },[]);

    return (
        
        <motion.div transition={{ ease : 'easeInOut' }} initial={{ opacity : 0 }} animate={{ opacity : 1 }} className="max-w-2xl mx-auto">
            <h1 className="display-4 text-center font-bold mb-8">
                {title}
            </h1>

            <div className='flex items-stretch justify-between gap-10 md:gap-20 my-10'>
                <button onClick={decrementCounter}
                    className='ring ring-indigo-500 rounded-4 bg-gray-400/20 fs-2 font-bold cursor-pointer text-center
                        transition-all hover:bg-gray-400/25 hover:ring-2 active:bg-indigo-500/50 p-3 md:py-5 flex-1'
                >-1</button>

                <strong className="text-gray-800 dark:text-white/95 text-4xl md:text-9xl text-shadow-lg text-shadow-black/20 dark:text-shadow-indigo-500/20 flex items-center">
                    {counter}
                </strong>

                <button onClick={incrementCounter}
                    className='ring ring-indigo-500 rounded-4 bg-gray-400/20 fs-2 font-bold  cursor-pointer text-center
                        transition-all hover:bg-gray-400/25 hover:ring-2 active:bg-indigo-500/50 p-3 md:py-5 flex-1'
                >+1</button>
            </div>

            <h2 className="fs-1 text-center">Custom value : </h2>

            <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-4 mt-10">
                <input type='number' ref={counterInput} placeholder={maximum} id="custom-counter-value"
                    className="ring ring-indigo-500 rounded-4 shadow-2xs font-bold display-1 text-center text-white
                    py-3 md:max-w-lg outline-0 transition-all focus:ring-2 focus:bg-gray-400/20"
                    onKeyDown={(e) => e.key == 'Enter' && handleChangeCounterValue() }
                />

                <label htmlFor="custom-counter-value" className="absolute top-2 left-4 md:text-xl text-gray-500 dark:text-gray-400 pointer-events-none">
                    {minimum} <i className="fa-solid fa-arrow-right-long"></i> {maximum}
                </label>

                <button type="button"
                    className='ring ring-indigo-500 rounded-4 bg-gray-400/20 fs-2 font-bold cursor-pointer
                        transition-all hover:bg-gray-400/25 hover:ring-2 active:bg-indigo-500/50 py-4 px-5'
                    onClick={handleChangeCounterValue}
                >
                    <SquarePen className="mx-auto" />
                </button>

            </div>
        </motion.div>
    )
}


/**
 * Higher OrderComponent : Provide data to another component at export
 */

export default withCounter(Counter);