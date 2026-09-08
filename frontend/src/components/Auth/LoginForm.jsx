import InputField from "../Forms/InputField";
import ConfirmButton from "../Forms/ConfirmButton";
import Alerts from "../Alerts/Alerts";
import { useRef, useState } from "react";
import { usersApi } from "../../api/users";
import { ApiError } from "../../api/client";

export default function LoginForm() {
    const [errors,setErrors] = useState([]);
    const [checking, setChecking] = useState(false);
    const userInput = useRef(null);
    const passInput = useRef(null);

    const validateFormData = () => {
        const data = {
            username: userInput.current.value.trim().toLowerCase(),
            password: passInput.current.value.trim()
        }
        for(const key in data){
            if(!data[key].length) {
                setErrors([{
                    type: 'error',
                    message: 'All field are required.',
                    autoRemove: false,
                }]);
                return false;
            }
        }
        return data;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setChecking(true);
        setErrors([]);
        
        const data = validateFormData();
        if(data) {
            try{
                const user = await usersApi.login(data.username, data.password);
                if(user){
                    setErrors(prev => [
                        ...prev,
                        {
                            type : "success",
                            autoRemove: false,
                            message: "Logged as : " + JSON.stringify(user),
                        }
        
                    ].slice(-1))
                }else{
                    setErrors(prev => [
                        ...prev,
                        {
                            type : "error",
                            message: "Invalid username or password.",
                        }
        
                    ].slice(-1))
                }
            }catch (error) { 
                setErrors(prev => [
                    ...prev,
                    {
                        type : "error",
                        accent : "Error",
                        message : error instanceof ApiError ?  "You're offline. Check you internet connection." : "Unable to connect with server.",
                    }
        
                ].slice(-1))
            }
        }
        setChecking(false)
    }

    return (
        <>
        <form onSubmit={handleFormSubmit} className="flex flex-col justify-center align-center gap-4 max-w-xl mx-auto my-4">
            
            <InputField label="Username" reference={userInput} />
            <InputField label="Password" reference={passInput} />

            <ConfirmButton label="Login" type="submit" disabled={checking} />
        </form>

        <Alerts alerts={errors} classes=" max-w-xl mx-auto" />
        </>
    )
}