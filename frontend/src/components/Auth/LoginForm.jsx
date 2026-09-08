import InputField from "../Forms/InputField";
import ConfirmButton from "../Forms/ConfirmButton";
import Alerts from "../Alerts/Alerts";
import { useRef, useState } from "react";
import { usersApi } from "../../api/users";

// david_r : 3478*#54

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
        
        const form = validateFormData();
        if(form) {
            try{
                const data = await usersApi.login(form.username, form.password);
                if(data.success){
                    setErrors(prev => [
                        ...prev,
                        {
                            type : "success",
                            autoRemove: false,
                            message: "Logged as : " + JSON.stringify(data),
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
                console.log(error.message)
                setErrors(prev => [
                    ...prev,
                    {
                        type : "error",
                        accent : "Error",
                        message : error.message,
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
            <InputField label="Password" reference={passInput} password={true} />

            <ConfirmButton label="Login" type="submit" disabled={checking} />
        </form>

        <Alerts alerts={errors} classes=" max-w-xl mx-auto" />
        </>
    )
}