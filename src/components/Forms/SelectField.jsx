import { memo, useState } from "react";

function SelectField({ label, id, classes, value, reference, options, valueIndex, showIndex, error = '', onChange= ()=>{}, emptyOption=true, countrySelect = false  }) {

    const [countryISO, setCountryISO] = useState(null);

    const handleChangeCountryFlag = (e) => {
        onChange(e);
        if (countrySelect) {
            const flagIso = e?.target?.value?.toLowerCase();
            setCountryISO(flagIso);  
        }   
    }
    
    return (
        <div className={"flex-1 form-group relative flex flex-col items-stretch mx-1 " + classes}>
             <select defaultValue={value} ref={reference} onChange={handleChangeCountryFlag} id={id}
                className="bg-gray-200 rounded-md pt-4 pb-2 px-2 text-black text-xl transition-all h-full
                focus:outline-none border-2 border-gray-200 hover:border-indigo-500 focus:border-indigo-500 focus:ring-3
                focus:ring-indigo-500">
                {
                    emptyOption &&
                    (
                       <option value="">
                            Choose a {label?.toLowerCase()}
                        </option> 
                    )
                }
                
                {options.map(
                    (obj,index) => (
                    <option key={index} value={obj[valueIndex] ?? obj}>
                        {obj[showIndex] ?? obj}
                    </option>
                ))}
            </select>

            <div className="text-gray-900/75 absolute top-1.5 left-2 pointer-events-none">
                {label}
            </div>

            {
                navigator.onLine && countryISO && (
                    <div className="absolute top-1/2 -translate-y-1/2 right-5 bg-white rounded-xl ring-1 ring-indigo-500 p-1 pointer-events-none">
                        <img src={`https://flagcdn.com/48x36/${countryISO}.png`} className="w-6" alt="Country Flag" />
                    </div>
                )
            }

            

            <p className={`text-red-400 m-0 text-sm ${error.length ? 'animate-fade-in' : 'animate-fade-out'}`}>{error}</p>
        </div>
    );
}

export default memo(SelectField);