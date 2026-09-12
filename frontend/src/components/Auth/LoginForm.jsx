import InputField from "../Forms/InputField";
import ConfirmButton from "../Forms/ConfirmButton";
import { useRef, useState } from "react";
import { usersApi } from "../../api/users";
import { Link } from "react-router-dom" 
import { useAlerts } from "../../Context/AlertsContext";


export default function LoginForm({ classes = ''}) {
    const [checking, setChecking] = useState(false);
    const { clearAlerts, pushAlert } = useAlerts();
    const userInput = useRef(null);
    const passInput = useRef(null);

    const capitalize = (text) => text.slice(0,1).toUpperCase() + text.slice(1).toLowerCase();

    const validateFormData = () => {
        const data = {
            username: userInput.current.value.trim().toLowerCase(),
            password: passInput.current.value.trim()
        }
        for(const key in data){
            if(!data[key].length) {
                pushAlert({
                    type : 'error',
                    message: 'All field are required.',
                    autoRemove: false,
                });
                return false;
            }
        }
        return data;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setChecking(true);
        
        const form = validateFormData();
        if(form) {
            try{
                const data = await usersApi.login(form.username, form.password);
            
                if(data?.success){
                    const user = data.user
                    pushAlert({
                        type : 'success',
                        message: `Logged as [${user.username}] ${capitalize(user.name.firstname)} ${capitalize(user.name.lastname)}`,
                        autoRemove: false,
                        cleanAlerts: true
                    });
                    localStorage.setItem('token', data.token);
                }else{
                    pushAlert({
                        type : 'error',
                        message: "Invalid username or password.",
                        autoRemove: true,
                        cleanAlerts: true
                    });
                }
            }catch (error) { 
                pushAlert({
                    type : 'error',
                    message: error?.message,
                    cleanAlerts: true
                });
            }
        }
        setChecking(false)
    }

    return (
        <div className={"transition-all overflow-hidden " + classes}>
            <form onSubmit={handleFormSubmit} 
                className="flex flex-col justify-center align-center gap-4 max-w-xl mx-auto my-4 transition-all">
                
                <InputField label="Username" reference={userInput} value="david_r"/>
                <InputField label="Password" reference={passInput} password={true} value="3478*#54" />

                <ConfirmButton label="Login" type="submit" disabled={checking} />
            </form>

            <p className="text-center">
                Haven't an account yet ? 
                <Link to="/store/register" className="inline-block ms-2 text-decoration-underline text-indigo-500 hover:text-white transition-colors">
                    Create account
                </Link>
            </p>
        </div>
    )
}