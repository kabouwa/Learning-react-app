import InputField from "../Forms/InputField";
import SelectField from "../Forms/SelectField";
import ConfirmButton from "../Forms/ConfirmButton";
import { useCallback, useRef, useState } from "react";
import { authApi } from "../../api/auth";
import Divider from "../Utilities/Divider";
import countries from '../../data/countries.json'
import { Link, useNavigate } from "react-router-dom" 
import { useAlerts } from "../../context/AlertsContext";
import { useUser } from "../../context/UserContext";
import useCapitalize from "../../hooks/useCapitalize";
import { routes } from "../../routes/routes";


export default function RegisterForm({ classes='' }) {
    const { pushAlert } = useAlerts();
    const { setUserData } = useUser();
    const [loading,setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const form = useRef(null);
    const { capitalize } = useCapitalize();
    const formData = useRef({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        shop_name: '',
        address : '',
        zipcode: '',
        city : '',
        country: ''
    });

    const handleInputChange = useCallback( (e) => {
        const {id, value, type, checked} = e.target;
        // Save value in state
        formData.current = {
            ...formData.current,
            [id] : type == 'checkbox' ? checked : value
        }
        // Remove error
        setErrors(prev => {
            return {
                ...prev,
                [id] : ''
            }
        });
    }, []);

    const validateFormData = () => {
        const f = formData.current;

        const data = {
            name : f.name?.trim()?.toLowerCase(),
            email : f.email?.trim()?.toLowerCase(),
            password : f.password?.trim(),
            password_confirmation : f.password_confirmation?.trim(),
            // phone: f.dial.slice(1) + parseInt(f.phone).toString(),
            shop_name : capitalize(f.shop_name?.trim()),
            address : f.address?.trim(),
            zipcode : f.zipcode?.trim(),
            city : capitalize(f.city.trim()),
            country : f?.country,
        } 

        const newErrors = {};

        // Required field !
        for(const key in data){
            if(!data[key]?.length) {
                newErrors[key] = `The ${key.split('_').join(' ')} field is required.`
            }
        }

        if (Object.values(newErrors).length) {
            setErrors(newErrors);
            return false;
        }
        
        // Email : 
        if ( ! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)){
            setErrors({
                email : 'The email field must be a valid email address.'
            });
            return false;
        }

        return data;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const user = validateFormData();
        if(user) {
            try{
                const data = await authApi.register(user);

                if(data?.errors){
                    setErrors(data.errors);
                }else{
                    // Creation successfull
                    setUserData(data.user);
                    form.current.reset();
                    pushAlert({
                        type : "success",
                        message: `Account created successfuly ${data?.user?.name} !`,
                        autoRemove: false,
                        clearAlerts: true
                    });
                    navigate('/dashboard')
                }

            }catch (error) {         
                pushAlert({
                    type : "error",
                    accent : "Error",
                    message : error?.message,
                    autoRemove : true
                });
            }
        }
        setLoading(false);
    }

    return (
        <div className={"transition-all overflow-hidden " + classes}>
            <form onSubmit={handleFormSubmit} ref={form}
                className="flex flex-col justify-center align-center gap-2.5 max-w-xl mx-auto my-4 transition-all">
                
                <InputField label="Name"  id="name" error={errors?.name} onChange={handleInputChange} />

                <InputField label="Email" id="email" error={errors?.email} onChange={handleInputChange} />

                <div className="flex flex-col md:flex-row gap-2">
                    <InputField label="Password" password={true} id="password" error={errors?.password} onChange={handleInputChange} />
                    <InputField label="Confirm password" password={true} id="password_confirmation" error={errors?.password_confirmation} onChange={handleInputChange} />
                </div>

                <Divider label="Shop information"/>

                <InputField label="Coffee Shop name" id="shop_name" error={errors?.shop_name} onChange={handleInputChange} />

                <InputField label="Shop address" id="address" error={errors?.address} onChange={handleInputChange} />

                <InputField label="Zip / Postal code" id="zipcode" error={errors?.zipcode} onChange={handleInputChange} />

                <div className="flex flex-col md:flex-row gap-2">
                    <InputField label="City" id="city" error={errors?.city} onChange={handleInputChange} />
                    <SelectField label="Country" id="country" options={countries} valueIndex="code" showIndex="name" error={errors?.country} onChange={handleInputChange} />
                </div>

                <ConfirmButton label="Create account" type="submit" classes="my-2" disabled={loading} />

                <p className="text-center">
                    Already have an account ? 
                    <Link to={routes.login} className="inline-block ms-2 text-decoration-underline text-indigo-500 hover:text-white transition-colors">
                        Switch to login
                    </Link>
                </p>
            </form>
        </div>
    )
}