import InputField from "../Forms/InputField";
import ConfirmButton from "../Forms/ConfirmButton";
import { useRef, useState } from "react";
import { authApi } from "../../api/auth";
import { Link } from "react-router-dom" 
import { useAlerts } from "../../Context/AlertsContext";
import { useUser } from "../../Context/UserContext";

export default function LoginForm({ classes = ''}) {
    const { pushAlert } = useAlerts();
    const { setUser } = useUser();
    const [checking, setChecking] = useState(false);
    const [errors, setErrors] = useState({});
    const emailInp = useRef(null);
    const passInput = useRef(null);


    const capitalize = (text) => text.slice(0,1).toUpperCase() + text.slice(1).toLowerCase();

    const validateFormData = () => {
        const data = {
            email: emailInp.current.value.trim().toLowerCase(),
            password: passInput.current.value.trim()
        }

        const newErrors = {};

        for(const key in data){
            if(!data[key].length) {
                newErrors[key] = `The ${key} field is required.`
            }
        }

        if (Object.values(newErrors).length) {
            setErrors(newErrors);
            return false;
        }

        return data;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setChecking(true);
        
        const user = validateFormData();
        if(user) {
            try{
                const data = await authApi.login(user);
                
                if(data?.errors){
                    if (data.message === 'The provided credentials are incorrect.') {
                        setErrors({});
                        pushAlert({
                            type : 'error',
                            message: "The provided credentials are incorrect.",
                            autoRemove: true,
                            clearAlerts: true
                        });
                    } else{
                        setErrors(data.errors);
                    }
                }else{
                    const user = data.user;
                    setUser(user);
                    pushAlert({
                        type : 'success',
                        message: `Logged as ${capitalize(user.name)}`,
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
        setChecking(false)
    }

    return (
        <div className={"transition-all overflow-hidden " + classes}>
            <form onSubmit={handleFormSubmit} 
                className="flex flex-col justify-center align-center gap-4 max-w-xl mx-auto my-4 transition-all">
                
                <InputField label="Email" error={errors?.email} reference={emailInp} />
                <InputField label="Password" error={errors?.password} reference={passInput} password={true}  />

                <ConfirmButton label="Login" type="submit" disabled={checking} />
            </form>

            <p className="text-center">
                Haven't an account yet ? 
                <Link to="/auth/register" className="inline-block ms-2 text-decoration-underline text-indigo-500 hover:text-white transition-colors">
                    Create account
                </Link>
            </p>
        </div>
    )
}