import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AlertsContext = createContext(null);

export function AlertsProvider({ children }) {
    const [alerts, setAlerts] = useState([]);

    const removeAlert = index => {
        setAlerts(
            prev => [...prev].splice(index,1)
        )
    }

    const pushAlert = ({message, type = 'info', accent = '', autoRemove = true, cleanAlerts = false}) => {
        const removeButton = !autoRemove;

        const newAlert = { type, accent, message, autoRemove, removeButton };
        
        if(cleanAlerts) {
            setAlerts([newAlert])
        }else{
            setAlerts(
                prev => [...prev, newAlert].slice(-6)
            )
        }
    }

    const clearAlerts = () => {
        setAlerts([]);
    }

    useEffect(() => {
        clearAlerts()
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