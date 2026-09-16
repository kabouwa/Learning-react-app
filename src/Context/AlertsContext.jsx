import {  useCallback, useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AlertsContext = createContext(null);

export function AlertsProvider({ children }) {
    const [alerts, setAlerts] = useState([]);

    const removeAlert = useCallback( index => {
        setAlerts(
            prev => [
                ... prev.slice(0,index),
                ... prev.slice(index + 1)
            ]
        )
    }, []);

    const pushAlert = useCallback( ({message, type = 'info', accent = '', autoRemove = true, clearAlerts = false}) => {
        const removeButton = !autoRemove;

        const newAlert = { type, accent, message, autoRemove, removeButton };
        
        if(clearAlerts) {
            setAlerts([newAlert])
        }else{
            setAlerts(
                prev => [...prev, newAlert].slice(-6)
            )
        }
    }, [])

    const clearAlerts = useCallback( () => {
        setAlerts([]);
    }, [])

    useEffect(() => {
        clearAlerts();
    },[location.pathname])


    return (
        <AlertsContext.Provider value={{alerts, pushAlert, removeAlert, clearAlerts}} >
            { children }
        </AlertsContext.Provider>
    )
}

export function useAlerts() {
    const context = useContext(AlertsContext);
    
    if (!context) {
        throw new Error("useAlerts must be used within AlertsProvider.")
    }
    return context;
}