import { useEffect, useState } from "react"
import AccountDetails from "../../components/Account/AccountDetails";
import AccountUpdate from "../../components/Account/AccountUpdate";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Account() {

    const [isUpdate, setIsUpdate] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsUpdate(
            location.pathname.startsWith('/dashboard/account/edit')
        );
    }, [location.pathname])

    return (
        
        <motion.div transition={{ ease : 'easeInOut' }} initial={{ opacity : 0 }} animate={{ opacity : 1 }} className="max-w-7xl mx-auto overflow-hidden">
            <h1 className="mb-4 text-center">
                {
                    !isUpdate
                    ? 'Profile Details'
                    : 'Edit Profile'
                }
                </h1>

            <div className={`   ${!isUpdate ? 'animate-fade-in' : 'hidden'}`}>
                <AccountDetails />
            </div>

            <div className={`   ${isUpdate ? 'animate-fade-in' : 'hidden'}`}>
                <AccountUpdate />
            </div>
        </motion.div>
    )
}