
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import InputField from '../Forms/InputField';
import { geoLocationApi } from "../../api/geoLoaction"
import { useAlerts } from "../../context/AlertsContext";
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCity, resetWeather, setCity } from '../../redux-toolkit/features/weatherSlice';
import { ConfirmButton } from '../Forms/ConfirmButton';
import { Locate } from 'lucide-react';

function CitySearch({ setLoading }) {
    // RTK
    const dispatch = useDispatch();
    // Context
    const { pushAlert } = useAlerts();

    const [searchParams, setSearchParams] = useSearchParams();
    const [cities, setCities] = useState(null);
    const navigatorCity = useRef(null);
    const [currentLocIsSet, setCurrentLocIsSet] = useState(false);
    const searchInp = useRef(null);
    const debounceTimer = useRef(null);

    const searchCities = useCallback(async (text) => {
        if (!text) return;
        try {
            const response = await geoLocationApi.search(text);
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
        dispatch( resetCity() )
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

    const formatDate = timeZone => 
        new Intl.DateTimeFormat('en-GB', {
            timeZone,
            year : 'numeric',
            month : 'short',
            day : '2-digit',
            minute : '2-digit',
            hour : '2-digit',

            hour12 : false
    }).format(new Date());

    const updateInputValue = (city) => {
        const { properties } = city;
        const { name, state, country} = properties;
        searchInp.current.value = `${ name ? name + ',': '' } ${ state ? state + ',': '' } ${country}`;
        setSearchParams({city: searchInp.current.value});
    }

    const handleSelectCity = (selectedCity) => {
        const { properties } = selectedCity;

        setCurrentLocIsSet(false);
        updateInputValue(selectedCity);

        // Set DateTime of City in their object
        selectedCity.date = formatDate(properties?.timezone?.name);      
    
        setCities(null);
        dispatch( setCity({ city: selectedCity}) )
    }

    // Current User Loaction 
    const getCitiesByCoordinates  = async (lat, lon) => {
        if (!lon || !lat) return;
        dispatch( resetWeather() );
        try {
            const response = await geoLocationApi.reverseGeocode(lat, lon);
            const data = response.features[0]; // first city

            const city =  {
                ...data,
                date: formatDate(data?.properties?.timezone?.name)    
            }

            updateInputValue(city);
                 
            dispatch( setCity({city}) );
            navigatorCity.current = city;

        } catch (error) {
            pushAlert({
                type : "error",
                accent : "Error",
                message : error.message,
                autoRemove : true
            });
        } finally {
            // setLoading(false);
            // after changing city weather parent component run their effect 
            // which re activate loading and fetch weather
        }
    }

    const handleUserGeoLocation = () => {
        setLoading(true);
        setCurrentLocIsSet(true);

        // if we already get the navigator city
        if (navigatorCity.current && !currentLocIsSet) {
            dispatch( setCity({ city: navigatorCity.current}) );
            return;
        }

        navigator.geolocation.getCurrentPosition(
            data => {
                const {coords: {longitude, latitude}} = data;
                
                getCitiesByCoordinates(latitude, longitude);
            },
            // User Deny To Share positon
            () => {
                setCurrentLocIsSet(false);
                setLoading(false);
                pushAlert({
                    type : "warning",
                    message : "Location access was denied. Please allow location access to use your current location..",
                    autoRemove : true,
                    clearAlerts : true
                });
            }
        );

    }

    useEffect(() => {     
        handleUserGeoLocation()
    }, []);

    return (
        <div className='my-6 relative z-70 flex justify-between'>
            <InputField id='city-search' label="Find your city" clearButton={true} value={searchParams.get('city')} reference={searchInp} onChange={handleInputChange} />

            <ConfirmButton classes='px-4' title="Use current position"onClick={handleUserGeoLocation} disabled={currentLocIsSet} >
                <Locate size={28} />
            </ConfirmButton>

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