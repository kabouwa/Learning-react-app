import InputField from "../Forms/InputField";
import ConfirmButton from "../Forms/ConfirmButton";
import Alerts from "../Alerts/Alerts";
import { useRef, useState } from "react";
import { usersApi } from "../../api/users";

// david_r : 3478*#54

export default function LoginForm({setLogin, classes = ''}) {
    const [errors,setErrors] = useState([]);
    const [checking, setChecking] = useState(false);
    const userInput = useRef(null);
    const passInput = useRef(null);

    const capitalize = (text) => text.slice(0,1).toUpperCase() + text.slice(1);
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
            
                if(data?.success){
                    const user = data.user
                    setErrors(prev => [
                        ...prev,
                        {
                            type : "success",
                            autoRemove: false,
                            message: `Logged as [${user.username}] ${capitalize(user.name.firstname)} ${capitalize(user.name.lastname)}`,
                        }
        
                    ].slice(-1))
                    localStorage.setItem('token', data.token);
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
                        message : error?.message,
                    }
        
                ].slice(-1))
            }
        }
        setChecking(false)
    }

    return (
        <div className={"transition-all overflow-hidden " + classes}>
            <form onSubmit={handleFormSubmit} 
                className="flex flex-col justify-center align-center gap-4 max-w-xl mx-auto mt-4 mb-20 transition-all">
                
                <InputField label="Username" reference={userInput} />
                <InputField label="Password" reference={passInput} password={true} />

                <ConfirmButton label="Login" type="submit" disabled={checking} />
            </form>

            <p className="text-center">
                Haven't an account yet ? 
                <button type="button" onClick={() => {setLogin(false)}}
                    className="inline-block ms-2 underline text-indigo-500 hover:text-white transition-colors">
                    Create account
                </button>
            </p>

            <Alerts alerts={errors} classes=" max-w-xl mx-auto" />
        </div>
    )
}