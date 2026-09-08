import { useState } from "react";

export default function InputField({label, reference, password=false}) {
    const [isPasswordHidden,setIsPasswordHidden] = useState(true);

    return (
        <div className="form-group relative flex flex-col items-stretch">
            
            <input type={password && isPasswordHidden ? "password" : "text"} 
                ref={reference} placeHolder={password ? '********' : ''}
                className="bg-gray-200 rounded-md pt-4 pb-2 px-2 text-black text-xl transition-all
                focus:outline-none border-2 hover:border-indigo-500 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500
                " />

            <div className="text-gray-900/75 absolute top-1.5 left-2 pointer-events-none">
                {label}
            </div>

            {
                password &&
                <button type="button" onClick={() => setIsPasswordHidden(prev => !prev)}
                        className="absolute top-5 right-4 text-indigo-500">
                        <i className={ `fa-solid text-xl ${ isPasswordHidden ? 'fa-eye' : 'fa-eye-slash'}` } ></i>
                </button>
                
            }
        </div>
    )
}