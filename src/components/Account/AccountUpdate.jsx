import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth";
import { useAlerts } from "../../context/AlertsContext";
import { useUser } from "../../context/UserContext";
import countries from "../../data/countries.json";
import ConfirmButton from "../Forms/ConfirmButton";
import InputField from "../Forms/InputField";
import SelectField from "../Forms/SelectField";
import Divider from "../Utilities/Divider";
import useCapitalize from "../../hooks/useCapitalize"

function Row({ children }) {
    return (
        <div className="flex flex-col md:flex-row gap-2">
            {children}
        </div>
    )
}

export default function AccountUpdate() {
    const { capitalize } = useCapitalize();
    const { pushAlert } = useAlerts();
    const { user, shop, setUserData } = useUser();
    const [loading,setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const form = useRef(null);
    const navigate = useNavigate();
    const formData = useRef();

    useEffect(() => {
        formData.current = {
            name: user?.name,
            email: user?.email,
            password: '',
            password_confirmation: '',
            shop_name: shop?.shop_name,
            address : shop?.address,
            zipcode: shop?.zipcode,
            city : shop?.city,
            country: shop?.country
        };
    }, [user, shop]);

    
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
            name : capitalize(f.name?.trim()),
            email : f.email?.trim()?.toLowerCase(),
            password : f.password?.trim(),
            password_confirmation : f.password_confirmation?.trim(),
            shop_name : capitalize(f.shop_name?.trim()),
            address : f.address?.trim(),
            zipcode : f.zipcode?.trim(),
            city : capitalize(f.city?.trim()),
            country : f?.country,
        } 

        const newErrors = {};

        // Required field !
        for(const key in data){
            if(!['password','password_confirmation'].includes(key) && !data[key]?.length) {
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
                const data = await authApi.update(user);

                if(data?.errors){
                    setErrors(data.errors);
                }else{
                    // Update successfull
                    setUserData(data.data);
                    form.current.reset();
                    pushAlert({
                        type : "success",
                        message: "Account updated successfuly !",
                        autoRemove: true,
                        clearAlerts: true
                    });
                    navigate('/dashboard/account/information');
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
        <>
        {
            Object.values(user ?? {}).length && Object.values(shop ?? {}).length
            ?(
            <div className="relative p-3 md:p-4 rounded-xl bg-white/90 dark:bg-gray-800">
                <form onSubmit={handleFormSubmit} ref={form}
                    className="flex flex-col justify-center align-center gap-2.5 mx-auto my-4 transition-all">
                    
                    <Row>
                        <InputField label="Name"  id="name" error={errors?.name} onChange={handleInputChange} value={user.name} />
                        <InputField label="Email" id="email" error={errors?.email} onChange={handleInputChange} value={user.email} />
                    </Row>
            
                    <Divider label="Shop information"/>

                    <Row>
                        <InputField label="Coffee Shop name" id="shop_name" error={errors?.shop_name} onChange={handleInputChange} value={shop.shop_name} />
                        <InputField label="Zip / Postal code" id="zipcode" error={errors?.zipcode} onChange={handleInputChange} value={shop.zipcode} />
                    </Row>
                    
                    <InputField label="Shop address" id="address" error={errors?.address} onChange={handleInputChange} value={shop.address} />
            
        
                    <Row>
                        <InputField label="City" id="city" error={errors?.city} onChange={handleInputChange} value={shop.city} />
                        <SelectField label="Country" id="country" options={countries} valueIndex="code" showIndex="name" error={errors?.country} onChange={handleInputChange} value={shop.country} countrySelect={true} />
                    </Row>

                    <Divider label="Update password"/>

                    <Row>
                        <InputField label="Password" placeholder="Leave blank to keep current password" password={true} id="password" value='' error={errors?.password} onChange={handleInputChange} />
                        <InputField label="Confirm password" password={true} id="password_confirmation" error={errors?.password_confirmation} onChange={handleInputChange} />
                    </Row>

                    <Row>
                        <Link to="/dashboard/account/information"
                            className="bg-gray-200 py-2.5 px-1 mx-1 rounded-1 fs-5 disabled:brightness-70 disabled:cursor-wait text-gray-500 
                            flex items-center justify-center flex-1 my-2 ring-1 ring-gray-500  transition-all hover:brightness-90">
                            Cancel
                        </Link>
                        <ConfirmButton label="Update" type="submit" classes="flex-1 my-2" disabled={loading} />
                    </Row>
            
                </form>
            </div>
        ) : (<p className="my-8 text-center text-gray-500/90">Loading ...</p>)
        }
        </>
    )
}