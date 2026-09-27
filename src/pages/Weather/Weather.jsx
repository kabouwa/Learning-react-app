import { motion } from "framer-motion"
import CitySearch from "../../components/Weather/CitySearch"
import { useEffect, useState } from "react"
import LoadingSvg from "../../components/Utilities/LoadingSvg";
import { useAlerts } from "../../context/AlertsContext";
import { weatherApi } from './../../api/weather';
import TodayWeather from "../../components/Weather/TodayWeather";
import HourlyWeather from "../../components/Weather/HourlyWeather";
import DailyWeather from "../../components/Weather/DailyWeather";


export default function Weather() {
    const { pushAlert } = useAlerts();
    const [loading, setLoading] = useState(false);

    const [city, setCity] = useState(null);
    const [currentWeather, setCurrentWeather] = useState({});
    const [hourlyWeather, setHourlyWeather] = useState({});
    const [dailyWeather, setDailyWeather] = useState({});
    
    useEffect(() => {
        async function loadCityWeather() {
            setCurrentWeather({});
            setHourlyWeather({});
            setDailyWeather({});
            setLoading(true);

            try {
                const { properties } = city;
                const { lat, lon } = properties;

                // Get Current Weather
                let data = await weatherApi.current(lat, lon);
                setCurrentWeather(data);

                // Get Hourly Weather
                data = await weatherApi.hourly(lat, lon);

                // Slicing hourly weather from current time
                const sliceTime = data.hourly.time.find( date => date.split('T')[1].split(':')[0] > new Date().getHours() );
                const index = data.hourly.time.indexOf(sliceTime);

                data.hourly.time = data.hourly.time.slice(index, 37);                           
                data.hourly.temperature_2m = data.hourly.temperature_2m.slice(index, index + 37);                            
                data.hourly.weather_code = data.hourly.weather_code.slice(index, index + 37);  

                setHourlyWeather(data);

                // Get Daily Weather
                data = await weatherApi.daily(lat, lon);  
                data.daily.time = data.daily.time.map(date => new Date(date).toLocaleDateString('en-US', { weekday: 'short' }));                                  
                setDailyWeather(data);

            } catch (error) {
                pushAlert({
                    type : "error",
                    accent : "Error",
                    message : error.message,
                    autoRemove : true
                });
            }finally {
                setLoading(false)
            }
        }

        if (city)loadCityWeather();  
        
    }, [city]);

    return (
        <motion.div transition={{ ease : 'easeInOut' }} initial={{ opacity : 0 }} animate={{ opacity : 1 }} className="max-w-7xl mx-auto">
            <h1 className="display-4 text-center font-bold mb-8">
                Explore Weather
            </h1>

            <CitySearch setCity={setCity}  />

            <div className="bg-white/80 dark:bg-gray-700 min-h-120 mx-1 my-4 rounded flex flex-col items-stretch justify-center overflow-x-hidden relative">

                
                <div className="flex items-center justify-center">
                    <LoadingSvg hidden={!loading} classes="mx-auto" />
                </div>

                {
                    !city &&
                    (<p className="text-gray-400 dark:text-gray-500 text-center">Search and select a city to start !</p>)
                }

                {
                    Object.values(currentWeather).length && Object.values(hourlyWeather).length && Object.values(dailyWeather).length 
                    ? (
                        <>
                            <TodayWeather city={city} currentWeather={currentWeather} />
                            <HourlyWeather hourlyWeather={hourlyWeather} />
                            <DailyWeather dailyWeather={dailyWeather} />
                        </>
                    ) : ''
                }

                

            </div>

        </motion.div>
    )
}