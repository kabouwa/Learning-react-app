import { createContext, useContext, useState } from "react";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
    const [statistics, setStatistics] = useState(null);

    return(
        <DashboardContext.Provider value={{ statistics, setStatistics }}>
            {children}
        </DashboardContext.Provider>
    )
}

export function useDashboard() {
    const context = useContext(DashboardContext);

    if (!context) {
        throw new Error("useDashboard must be used within DashboardProvider.")
    }

    return context;
}