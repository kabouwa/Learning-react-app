
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import InputField from '../Forms/InputField';
import { geoAutoCompleteApi } from "../../api/geoAutocomplete"
import { useAlerts } from "../../context/AlertsContext";
import { useSearchParams } from 'react-router-dom';

function CitySearch({ setCity }) {
    const { pushAlert } = useAlerts();
    const [cities, setCities] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchInp = useRef(null);
    const debounceTimer = useRef(null);

    const searchCities = useCallback(async (text) => {
        if (!text) return;
        try {
            const response = await geoAutoCompleteApi.search(text);
            const data = response.features; 
            setCities(data);
        } catch (error) {
            pushAlert({
                type : "error",
                accent : "Error",
                message : error.message,
                autoRemove : true
            });
        }
    }, []);


    const handleInputChange = useCallback(() => {
        const city = searchInp.current?.value?.trim();
        setCities(null);
        if(city) {
            setSearchParams({city});
        }else{
            setSearchParams(prev => prev.delete('city'));          
        }

        clearTimeout(debounceTimer.current)

        debounceTimer.current = setTimeout(() => {
            searchCities(city)
        }, 150);  

    }, []);

    useEffect(() => {        
        function autoCloseDropDownCities (e) {
            if( !['city-search', 'cities-dropdown'].includes(e.target?.id)) setCities(null);
        }

        document.addEventListener('click', autoCloseDropDownCities)

        return () => {
            clearTimeout(debounceTimer.current);
            document.removeEventListener('click', autoCloseDropDownCities);
        } 
    }, []);

    const handleSelectCity = (selectedCity) => {
        const { properties } = selectedCity;
        const { name, state, country} = properties;

        searchInp.current.value = `${ name ? name + ',': '' } ${ state ? state + ',': '' } ${country}`;
        setSearchParams({city: searchInp.current.value});

        // Set DateTime of City in their object
        selectedCity.date = new Intl.DateTimeFormat('en-GB', {
            timeZone : selectedCity?.properties?.timezone?.name,
            year : 'numeric',
            month : 'short',
            day : '2-digit',
            minute : '2-digit',
            hour : '2-digit',

            hour12 : false
        }).format(new Date())        
    
        setCities(null);
        setCity(selectedCity);
    }

    return (
        <div className='my-6 relative z-70'>
            <InputField id='city-search' label="Find your city" clearButton={true} value={searchParams.get('city')} reference={searchInp} onChange={handleInputChange} />

            {
                cities &&
                <div className='w-[98.8%] bg-white rounded-xl absolute top-18 left-1 overflow-hidden max-h-80'>
                    <ul className='text-dark p-1 my-2 rounded-xl' id='cities-dropdown'>
                        {
                            cities.length
                            ? cities.map((c, index) => {
                                const { properties } = c;
                                const { name, state, country} = properties;

                                return (
                                    <li key={name + index + country} onClick={() => handleSelectCity(c)} className='py-1 px-2 rounded-xl hover:bg-indigo-500 hover:text-white cursor-pointer'>
                                        { name ? name + ',': '' } { state ? state + ',': '' } {country}
                                    </li>
                                )
                            })
                            : (<li className='py-1 px-2 text-gray-500'>No result found !</li>)
                        }
                    </ul>
                </div>
            }
        </div>
    )
}


export default memo(CitySearch);