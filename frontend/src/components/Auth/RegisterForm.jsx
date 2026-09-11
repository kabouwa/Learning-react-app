import InputField from "../Forms/InputField";
import SelectField from "../Forms/SelectField";
import ConfirmButton from "../Forms/ConfirmButton";
import Alerts from "../Alerts/Alerts";
import { useRef, useState } from "react";
import { usersApi } from "../../api/users";
import Divider from "../Utilities/Divider";
import countries from '../../data/countries.json'
import { Link } from "react-router-dom" 


export default function RegisterForm({ classes='' }) {
    const [errors,setErrors] = useState([]);
    const [loading,setLoading] = useState(false);
    const form = useRef(null);

    const seen = []
    let phoneDials = [...countries]
        .sort((c1, c2) => parseInt(c1.dial) - parseInt(c2.dial))
        .filter(c => {
            if ( !seen.includes(c.dial)) {
                seen.push(c.dial)
                return true
            } 
        }) 
        .map(country => country.dial)   

    const formData = useRef({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        dial: '',
        phone: '',
        address : '',
        zipcode: '',
        city : '',
        country: ''
    });


    const capitalize = (text) => text.slice(0,1).toUpperCase() + text.slice(1).toLowerCase();

    const handleInputChange = (e) => {
        const {id, value, type, checked} = e.target;
        formData.current = {
            ...formData.current,
            [id] : type == ' checkbox' ? checked : value
        }
    }

    const validateFormData = () => {
        const f = formData.current;

        const data = {
            username: f.username.trim().toLowerCase(),
            password: f.password.trim(),
            email: f.email.trim().toLowerCase(),
            name : {
                firstname: capitalize(f.firstname.trim()),
                lastname: capitalize(f.lastname.trim())
            },
            phone: f.dial.slice(1) + parseInt(f.phone).toString(),
            address : {
                street: f.address.trim(),
                zipcode: f.zipcode.trim(),
                city : capitalize(f.city.trim()),
                country: f.country
            }
        }

        // Required field !
        for(const key1 in data){
            if(!['name','phone'].includes(key1) && !data[key1].length) {
                setErrors([{
                    type: 'error',
                    message: 'All field are required.',
                    autoRemove: false,
                }]);
                return false;
            }else{
                for(const key2 in data[key1]){
                    if(!data[key1][key2].length) {
                        setErrors([{
                        type: 'error',
                            message: 'All field are required.',
                            autoRemove: false,
                        }]);
                        return false;
                    }
                }
            }
        }

        // Email : 
        if ( ! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)){
            setErrors([{
                type: 'error',
                message: 'Invalid Email address.',
                autoRemove: false,
            }]);
            return false;
        }

        return data;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);

        const user = validateFormData();
        
        if(user) {
            console.log(user);
            
            try{
                const data = await usersApi.create(form);

                if(data.id){
                    form.current.reset()
                    setErrors(prev => [
                        ...prev,
                        {
                            type : "success",
                            autoRemove: false,
                            message: `Account created successfuly id: ${user.id} - [${user.username}] Name :${capitalize(user.name.firstname)} ${capitalize(user.name.lastname)}.`,
                        }
        
                    ].slice(-1))
                }else{
                    setErrors(prev => [
                        ...prev,
                        {
                            type : "error",
                            message: "An error occurred while creating your account. Please try again later." ,
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
        setLoading(false);
    }

    return (
        <div className={"transition-all overflow-hidden " + classes}>
            <form onSubmit={handleFormSubmit} ref={form}
                className="flex flex-col justify-center align-center gap-2.5 max-w-xl mx-auto my-4 transition-all">
                
                <InputField label="Email" id="email" onChange={handleInputChange} />

                <div className="flex flex-col md:flex-row gap-2">
                    <InputField label="Username"  id="username" onChange={handleInputChange} />
                    <InputField label="Password" password={true} id="password" onChange={handleInputChange} />
                </div>

                <Divider label="Personal informations"/>

                <div className="flex flex-col md:flex-row gap-2">
                    <InputField label="First name" id="firstname" onChange={handleInputChange} />
                    <InputField label="Last name" id="lastname" onChange={handleInputChange} />
                </div>

                <div className="flex gap-2">
                    <SelectField label="Dial code" options={phoneDials} onChange={handleInputChange} id="dial"
                        classes="max-w-21 md:max-w-25" emptyOption={false} defaultValue="+1" />

                    <InputField label="Phone number" id="phone" onChange={handleInputChange} />
                </div>

                <Divider label="Adress details"/>

                <InputField label="Address" id="address" onChange={handleInputChange} />
                <InputField label="Postal code" id="zipcode" onChange={handleInputChange} />

                <div className="flex flex-col md:flex-row gap-2">
                    <InputField label="City" id="city" onChange={handleInputChange} />
                    <SelectField label="Country" id="country" options={countries} valueIndex="code" showIndex="name" onChange={handleInputChange} />
                </div>

                <ConfirmButton label="Register" type="submit" classes="my-2" disabled={loading} />

                <p className="text-center">
                    Already have an account ? 
                    <Link to="/store/login" className="inline-block ms-2 text-decoration-underline text-indigo-500 hover:text-white transition-colors">
                        Switch to login
                    </Link>
                </p>
            </form>

            <Alerts alerts={errors} classes=" max-w-xl mx-auto" />
        </div>
    )
}