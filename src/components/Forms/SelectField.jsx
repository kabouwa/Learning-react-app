import { memo } from "react";

function SelectField({ label, id, classes, value, reference, options, valueIndex, showIndex, error = '', onChange= ()=>{}, emptyOption=true  }) {
    
    return (
        <div className={"flex-1 form-group relative flex flex-col items-stretch mx-1 " + classes}>
             <select defaultValue={value} ref={reference} onChange={onChange} id={id}
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

            <p className={`text-red-400 m-0 text-sm ${error.length ? 'animate-fade-in' : 'animate-fade-out'}`}>{error}</p>
        </div>
    );
}

export default memo(SelectField);