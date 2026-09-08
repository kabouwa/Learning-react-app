import { data } from "../../api/data";

export default function CountrySelect({ value = 'MA', reference, label='Country' }) {
    const countries = data.getCountries();

    return (
        <div className="flex-1 form-group relative flex flex-col items-stretch">
             <select value={value} ref={reference}
                className="bg-gray-200 rounded-md pt-4 pb-2 px-2 text-black text-xl transition-all
                focus:outline-none border-2 border-gray-200 hover:border-indigo-500 focus:border-indigo-500 focus:ring-3
                focus:ring-indigo-500">
                <option value="">Select a country</option>
                {countries.map(c => (
                    <option key={c.code} value={c.code}>
                        {c.name}
                    </option>
                ))}
            </select>

            <div className="text-gray-900/75 absolute top-1.5 left-2 pointer-events-none">
                {label}
            </div>
        </div>
    );
}