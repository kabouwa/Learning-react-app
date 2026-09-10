import InputField from "../Forms/InputField";
import ConfirmButton from "../Forms/ConfirmButton";
import Alerts from "../Alerts/Alerts";
import { useRef, useState } from "react";
import { usersApi } from "../../api/users";
import Divider from "../Utilities/Divider";
import CountrySelect from "../CountrySelect/CountrySelect";

// david_r : 3478*#54
export default function RegisterForm({ setLogin, classes='' }) {
    const [errors,setErrors] = useState([]);
    const [form,setForm] = useState({});

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
        <div className={"transition-all overflow-hidden " + classes}>
            <form onSubmit={handleFormSubmit}
                className="flex flex-col justify-center align-center gap-2.5 max-w-xl mx-auto mt-4 mb-20 transition-all">
                
                <InputField label="Email" />

                <div className="flex flex-col md:flex-row gap-2">
                    <InputField label="Username" />
                    <InputField label="Password" password={true} />
                </div>

                <Divider label="Personal informations"/>

                <div className="flex flex-col md:flex-row gap-2">
                    <InputField label="First name"  />
                    <InputField label="Last name" />
                </div>

                <InputField label="Phone number" />

                <Divider label="Adress details"/>

                <InputField label="Address"  />
                <InputField label="Postal code"  />

                <div className="flex flex-col md:flex-row gap-2">
                    <InputField label="City"  />
                    <CountrySelect />
                </div>

                <ConfirmButton label="Register" type="submit" classes="my-2" />

                <p className="text-center">
                    Already have an account ? 
                    <button type="button" onClick={() => {setLogin(true)}}
                        className="inline-block ms-2 underline text-indigo-500 hover:text-white transition-colors">
                        Switch to login
                    </button>
                </p>
            </form>

            <Alerts alerts={errors} classes=" max-w-xl mx-auto" />
        </div>
    )
}