import { createContext, useContext, useRef } from "react";

const ScrollContainerContext = createContext(null);

export function ScrollContainerProvider({ children }) {
    const scrollRef = useRef(null);

    return(
        <ScrollContainerContext.Provider value={scrollRef}>
            {children}
        </ScrollContainerContext.Provider>
    )
}

export function useScrollContainer() {
    const context = useContext(ScrollContainerContext);

    if (!context) {
        throw new Error("useScrollContainer must be used within ScrollContainerProvider.")
    }

    return context;
}