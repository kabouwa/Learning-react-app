import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InputField({label, classes, reference, placeholder, value, password=false, readonly=false, id, error, onChange= ()=>{}}) {
    const [isPasswordHidden,setIsPasswordHidden] = useState(true);

    return (
        <div className={"flex-1 form-group relative flex flex-col items-stretch mx-1 " + classes}>
            
            <input type={password && isPasswordHidden ? "password" : "text"} 
                ref={reference} placeholder={placeholder ? placeholder : password ? '********' : ''}
                readOnly={readonly} onChange={onChange} id={id}
                autoComplete="current-password" defaultValue={value}
                className="bg-gray-200 rounded-md pt-4 pb-2 px-2 text-black text-xl transition-all
                focus:outline-none border-2 border-gray-200 hover:border-indigo-500 focus:border-indigo-500 focus:ring-3
                focus:ring-indigo-500" />

            <div className="text-gray-900/75 absolute top-1.5 left-2 pointer-events-none">
                {label}
            </div>

            {
                password &&
                <button type="button" onClick={() => setIsPasswordHidden(prev => !prev)}
                        className="absolute top-5 right-4 text-indigo-500">
                        { isPasswordHidden ? <Eye  size={23}/> : <EyeOff size={23} /> }
                </button>
            }

            <p className={`text-red-500 dark:text-red-400 m-0 text-sm ${error?.length ? 'animate-fade-in' : 'animate-fade-out'}`}>{error}</p>
        </div>
    )
}