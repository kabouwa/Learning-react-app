import { createContext, useContext, useEffect, useState } from "react";
import { useLoading } from "./LoadingContext";
import { authApi } from "../api/auth";
import { useAlerts } from "../context/AlertsContext";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);
    const [shop, setShop] = useState(null);
    const { setLoading } = useLoading();
    const { pushAlert } = useAlerts();

    // Save User
    useEffect(() => {
        if (!userData) {
            setUser(null);
            setShop(null);
            return;
        }

        setUser(()=> {
            const userCopy = {...userData}

            setShop(
                userCopy?.shop ?? null
            );

            delete userCopy.shop;
            return userCopy;
            
        });

    }, [userData]);

    // Load user
    useEffect(() => {
        async function loadUser() {
            setLoading(true);

            const token = localStorage.getItem('token');

            if (token) {
                try{
                    const data = await authApi.user();

                    if(data?.errors){
                        pushAlert({
                            type : 'error',
                            message: data.message,
                            autoRemove: true,
                            clearAlerts: true
                        });
                    }else{                        
                        const user = data.data;
                        setUserData(user);

                        pushAlert({
                            type : 'success',
                            message: "User Login in !",
                            autoRemove: true,
                            clearAlerts: true
                        });               
                    }
                }catch (error) { 
                    pushAlert({
                        type : 'error',
                        message: error?.message,
                        clearAlerts: true
                    });
                }
            }
            setLoading(false);
        }

        loadUser();
    }, [pushAlert, setLoading]);



    return (
        <UserContext.Provider value={{user, shop, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within UserProvider.");
    }
    return context;
}