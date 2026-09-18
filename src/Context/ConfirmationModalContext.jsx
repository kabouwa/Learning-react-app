import { createContext, useContext, useState } from "react";

const ConfirmationModalContext = createContext(null);

export function ConfirmationModalProvider({ children }) {
    const [showModal, setShowModal] = useState(false);
    const [props, setProps] = useState({});

    return (
        <ConfirmationModalContext.Provider value={{ showModal, setShowModal, props, setProps }}>
            {children}
        </ConfirmationModalContext.Provider>
    )
}

export function useConfirmationModal() {
    const context = useContext(ConfirmationModalContext);

    if (!context) {
        throw new Error("useConfirmationModal must be used within ConfirmationModalProvider.");
    }
    return context;
}